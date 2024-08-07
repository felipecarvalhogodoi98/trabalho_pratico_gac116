from django.urls import path
from .views import (
    PortfolioListCreateView,
    PortfolioDetailView,
    PortfolioCertificateListCreateView,
    PortfolioSkillListCreateView,
    PortfolioProjectListCreateView,
    UserPortfoliosView,
    PortfolioUpdateView,
    PortfolioCertificateUpdateView,
    PortfolioSkillUpdateView,
    PortfolioProjectUpdateView
)

urlpatterns = [
    path('', PortfolioListCreateView.as_view(), name='portfolio-list-create'),
    path('<int:pk>/', PortfolioDetailView.as_view(), name='portfolio-detail'),
    path('<int:pk>/update/', PortfolioUpdateView.as_view(), name='portfolio-update'),
    
    path('<int:portfolio_pk>/certificates/', PortfolioCertificateListCreateView.as_view(), name='portfolio-certificate-list-create'),
    path('<int:portfolio_pk>/certificate/<int:pk>/update/', PortfolioCertificateUpdateView.as_view(), name='portfolio-certificate-update'),
    
    path('<int:portfolio_pk>/skills/', PortfolioSkillListCreateView.as_view(), name='portfolio-skill-list-create'),
    path('<int:portfolio_pk>/skill/<int:pk>/update/', PortfolioSkillUpdateView.as_view(), name='portfolio-skill-update'),
    
    path('<int:portfolio_pk>/projects/', PortfolioProjectListCreateView.as_view(), name='portfolio-project-list-create'),
    path('<int:portfolio_pk>/project/<int:pk>/update/', PortfolioProjectUpdateView.as_view(), name='portfolio-project-update'),
   
    path('user/', UserPortfoliosView.as_view(), name='user-portfolio'),
]