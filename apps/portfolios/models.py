from django.db import models
from apps.users.models import CustomUser

class Portfolio(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PortfolioCertificate(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PortfolioSkill(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PortfolioProject(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio_projects/', blank=True, null=True)
    link_git = models.URLField(blank=True, null=True)
    link_site = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)