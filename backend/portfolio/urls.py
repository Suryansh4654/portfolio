from django.urls import path
from .views import (
    ProfileView, SkillsView, CareerNarrativeView,
    ProjectViewSet, AchievementViewSet, PortfolioDashboardView
)

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('skills/', SkillsView.as_view(), name='skills'),
    path('career-narrative/', CareerNarrativeView.as_view(), name='career_narrative'),
    path('projects/', ProjectViewSet.as_view({'get': 'list'}), name='projects-list'),
    path('projects/<slug:slug>/', ProjectViewSet.as_view({'get': 'retrieve'}), name='projects-detail'),
    path('achievements/', AchievementViewSet.as_view({'get': 'list'}), name='achievements-list'),
    path('', PortfolioDashboardView.as_view(), name='portfolio_dashboard'),
]
