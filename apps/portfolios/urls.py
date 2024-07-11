from django.urls import path
from .views import (
    PortfolioListCreateView,
    PortfolioDetailView,
    PortfolioCertificateListCreateView,
    PortfolioSkillListCreateView,
    PortfolioProjectListCreateView
)

urlpatterns = [
    path('', PortfolioListCreateView.as_view(), name='portfolio-list-create'),
    path('<int:pk>/', PortfolioDetailView.as_view(), name='portfolio-detail'),
    path('<int:portfolio_pk>/certificates/', PortfolioCertificateListCreateView.as_view(), name='portfolio-certificate-list-create'),
    path('<int:portfolio_pk>/skills/', PortfolioSkillListCreateView.as_view(), name='portfolio-skill-list-create'),
    path('<int:portfolio_pk>/projects/', PortfolioProjectListCreateView.as_view(), name='portfolio-project-list-create'),
]