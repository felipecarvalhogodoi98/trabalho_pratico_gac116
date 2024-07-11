from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Portfolio, PortfolioCertificate, PortfolioSkill, PortfolioProject, Vacancy, VacancyBenefit, VacancyResponsibility, VacancyRequirement, Application

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'user_type']

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Portfolio)
admin.site.register(PortfolioCertificate)
admin.site.register(PortfolioSkill)
admin.site.register(PortfolioProject)
admin.site.register(Vacancy)
admin.site.register(VacancyBenefit)
admin.site.register(VacancyResponsibility)
admin.site.register(VacancyRequirement)
admin.site.register(Application)
