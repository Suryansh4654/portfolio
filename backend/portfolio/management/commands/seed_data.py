import os
import json
from django.core.management.base import BaseCommand
from django.conf import settings
from portfolio.models import Profile, Education, SkillCategory, Skill, Project, Achievement

class Command(BaseCommand):
    help = 'Seeds database from resume_context JSON files'

    def handle(self, *args, **options):
        context_dir = os.path.join(settings.BASE_DIR, 'resume_context')
        
        # 1. Profile and Education
        profile_path = os.path.join(context_dir, 'profile.json')
        if os.path.exists(profile_path):
            with open(profile_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                profile, created = Profile.objects.update_or_create(
                    id=1,
                    defaults={
                        'name': data.get('name', ''),
                        'title': data.get('title', ''),
                        'bio': data.get('positioning', ''), # maps positioning to bio as well
                        'positioning': data.get('positioning', ''),
                        'location': data.get('location', ''),
                        'email': data.get('email', ''),
                        'linkedin_url': data.get('linkedin_url', ''),
                        'github_url': data.get('github_url', ''),
                        'leetcode_url': data.get('leetcode_url', ''),
                        'codechef_url': data.get('codechef_url', '')
                    }
                )
                self.stdout.write(self.style.SUCCESS(f"Profile '{profile.name}' seeded"))

                for i, edu in enumerate(data.get('education', [])):
                    Education.objects.update_or_create(
                        institution=edu.get('institution', ''),
                        degree=edu.get('degree', ''),
                        defaults={
                            'field': edu.get('field', ''),
                            'start_date': edu.get('start_date', ''),
                            'end_date': edu.get('end_date', ''),
                            'grade': edu.get('grade', ''),
                            'location': edu.get('location', ''),
                            'order': i
                        }
                    )
                self.stdout.write(self.style.SUCCESS(f"{len(data.get('education', []))} education entries seeded"))
        
        # 2. Skills
        skills_path = os.path.join(context_dir, 'skills.json')
        if os.path.exists(skills_path):
            with open(skills_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for i, cat_data in enumerate(data.get('categories', [])):
                    category, _ = SkillCategory.objects.update_or_create(
                        name=cat_data.get('name', ''),
                        defaults={'order': i}
                    )
                    
                    for j, skill_data in enumerate(cat_data.get('skills', [])):
                        Skill.objects.update_or_create(
                            category=category,
                            name=skill_data.get('name', ''),
                            defaults={
                                'icon_class': skill_data.get('icon', ''),
                                'proficiency': skill_data.get('proficiency', 50),
                                'order': j
                            }
                        )
                self.stdout.write(self.style.SUCCESS(f"Skills seeded"))

        # 3. Projects
        projects_path = os.path.join(context_dir, 'projects.json')
        if os.path.exists(projects_path):
            with open(projects_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for i, proj_data in enumerate(data.get('projects', [])):
                    Project.objects.update_or_create(
                        slug=proj_data.get('slug', ''),
                        defaults={
                            'title': proj_data.get('title', ''),
                            'summary': proj_data.get('summary', ''),
                            'description': proj_data.get('description', ''),
                            'tech_stack': proj_data.get('tech_stack', []),
                            'features': proj_data.get('features', []),
                            'github_url': proj_data.get('github_url', ''),
                            'live_url': proj_data.get('live_url', ''),
                            'date': proj_data.get('date', ''),
                            'is_featured': proj_data.get('is_featured', False),
                            'order': i
                        }
                    )
                self.stdout.write(self.style.SUCCESS(f"{len(data.get('projects', []))} projects seeded"))

        # 4. Achievements
        achievements_path = os.path.join(context_dir, 'achievements.json')
        if os.path.exists(achievements_path):
            with open(achievements_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
                # Achievements
                for i, ach_data in enumerate(data.get('achievements', [])):
                    Achievement.objects.update_or_create(
                        title=ach_data.get('title', ''),
                        issuer=ach_data.get('issuer', ''),
                        defaults={
                            'description': ach_data.get('description', ''),
                            'category': 'achievement',
                            'date': ach_data.get('date', ''),
                            'order': i
                        }
                    )
                
                # Certifications
                for i, cert_data in enumerate(data.get('certifications', [])):
                    Achievement.objects.update_or_create(
                        title=cert_data.get('title', ''),
                        issuer=cert_data.get('issuer', ''),
                        defaults={
                            'description': cert_data.get('description', ''),
                            'category': 'certification',
                            'date': cert_data.get('date', ''),
                            'order': i + 100 # Offset order so they appear after achievements if ordered together
                        }
                    )
                
                self.stdout.write(self.style.SUCCESS(f"Achievements and Certifications seeded"))
                
        self.stdout.write(self.style.SUCCESS('Successfully seeded all data!'))
