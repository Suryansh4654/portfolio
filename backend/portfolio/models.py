from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    bio = models.TextField()
    positioning = models.TextField()
    location = models.CharField(max_length=255)
    email = models.EmailField()
    linkedin_url = models.URLField()
    github_url = models.URLField()
    leetcode_url = models.URLField(blank=True, null=True)
    codechef_url = models.URLField(blank=True, null=True)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)

    def __str__(self):
        return self.name

class Education(models.Model):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field = models.CharField(max_length=255, blank=True)
    start_date = models.CharField(max_length=50, blank=True)
    end_date = models.CharField(max_length=50, blank=True)
    grade = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=255, blank=True)
    board = models.CharField(max_length=255, blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class SkillCategory(models.Model):
    name = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    icon_class = models.CharField(max_length=255, blank=True)
    proficiency = models.IntegerField(default=50) # 1-100
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    description = models.TextField()
    tech_stack = models.JSONField(default=list)
    features = models.JSONField(default=list)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    date = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class Achievement(models.Model):
    CATEGORY_CHOICES = [
        ('achievement', 'Achievement'),
        ('certification', 'Certification'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    issuer = models.CharField(max_length=255)
    date = models.CharField(max_length=100, blank=True)
    url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
