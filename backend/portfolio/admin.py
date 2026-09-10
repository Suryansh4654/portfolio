from django.contrib import admin
from .models import Profile, Education, SkillCategory, Skill, Project, Achievement

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'start_date', 'end_date', 'order')
    search_fields = ('institution', 'degree')

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'order')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'order')
    search_fields = ('title', 'summary')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'issuer', 'order')
    list_filter = ('category',)
    search_fields = ('title', 'issuer')
