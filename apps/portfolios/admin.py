from django.contrib import admin
from .models import Portfolio, PortfolioCertificate, PortfolioSkill, PortfolioProject

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email')

@admin.register(PortfolioCertificate)
class PortfolioCertificateAdmin(admin.ModelAdmin):
    list_display = ('portfolio', 'description', 'created_at', 'updated_at')
    search_fields = ('portfolio__user__username', 'portfolio__user__email')

@admin.register(PortfolioSkill)
class PortfolioSkillAdmin(admin.ModelAdmin):
    list_display = ('portfolio', 'description', 'created_at', 'updated_at')
    search_fields = ('portfolio__user__username', 'portfolio__user__email')

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ('portfolio', 'description', 'link_git', 'link_site', 'created_at', 'updated_at')
    search_fields = ('portfolio__user__username', 'portfolio__user__email')
