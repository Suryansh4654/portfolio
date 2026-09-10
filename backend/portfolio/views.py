import os
import json
from django.conf import settings
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Profile, Education, SkillCategory, Project, Achievement
from .serializers import (
    ProfileSerializer, EducationSerializer, SkillCategorySerializer,
    ProjectSerializer, AchievementSerializer
)

class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"detail": "Profile not found"}, status=404)
        
        profile_data = ProfileSerializer(profile).data
        education_data = EducationSerializer(Education.objects.all(), many=True).data
        profile_data['education'] = education_data
        
        return Response(profile_data)

class SkillsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = SkillCategory.objects.prefetch_related('skills').all()
        serializer = SkillCategorySerializer(categories, many=True)
        return Response(serializer.data)

class CareerNarrativeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        file_path = os.path.join(settings.BASE_DIR, 'resume_context', 'career_narrative.json')
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return Response(data)
        except Exception as e:
            return Response({"error": "Could not load narrative", "details": str(e)}, status=500)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [AllowAny]

class PortfolioDashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        profile_data = ProfileSerializer(profile).data if profile else None
        if profile_data:
            education_data = EducationSerializer(Education.objects.all(), many=True).data
            profile_data['education'] = education_data

        # Flat list of skills with category name added
        skills_list = []
        categories = SkillCategory.objects.prefetch_related('skills').all()
        for cat in categories:
            for skill in cat.skills.all():
                skills_list.append({
                    'id': skill.id,
                    'name': skill.name,
                    'proficiency': skill.proficiency,
                    'icon_class': skill.icon_class,
                    'category': cat.name,
                    'order': skill.order
                })

        # Career Narrative
        narrative_data = {}
        narrative_path = os.path.join(settings.BASE_DIR, 'resume_context', 'career_narrative.json')
        if os.path.exists(narrative_path):
            try:
                with open(narrative_path, 'r', encoding='utf-8') as f:
                    narrative_data = json.load(f)
            except Exception as e:
                print(f"Error loading narrative: {e}")

        # Projects
        projects_data = ProjectSerializer(Project.objects.all(), many=True).data

        # Achievements and Certifications
        ach_qs = Achievement.objects.all()
        achievements_data = AchievementSerializer(ach_qs.filter(category='achievement'), many=True).data
        certifications_data = AchievementSerializer(ach_qs.filter(category='certification'), many=True).data

        # Extract currently_learning list from career narrative for "learning" grid
        learning_list = narrative_data.get('currently_learning', [])
        
        # Stats
        stats_data = {
            'projects': len(projects_data),
            'problems_solved': 300, # Hardcoded default matching resume
            'cgpa': 8.23 # Hardcoded CGPA matching resume
        }
        # Try to dynamically update stats if profile or achievements have info
        for ach in ach_qs:
            if "Problems Solved" in ach.title or "DSA" in ach.title:
                import re
                nums = re.findall(r'\d+', ach.title)
                if nums:
                    stats_data['problems_solved'] = int(nums[0])

        response_data = {
            'profile': profile_data,
            'skills': skills_list,
            'career_narrative': narrative_data,
            'projects': projects_data,
            'achievements': achievements_data,
            'certifications': certifications_data,
            'learning': learning_list,
            'stats': stats_data
        }

        return Response(response_data)

