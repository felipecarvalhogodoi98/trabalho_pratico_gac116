from django.contrib import admin
from .models import Vacancy, VacancyBenefit, VacancyResponsibility, VacancyRequirement, Application

@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'created_at', 'updated_at')
    search_fields = ('user__username', 'user__email', 'title')

@admin.register(VacancyBenefit)
class VacancyBenefitAdmin(admin.ModelAdmin):
    list_display = ('vacancy', 'title', 'description', 'created_at', 'updated_at')
    search_fields = ('vacancy__title', 'title')

@admin.register(VacancyResponsibility)
class VacancyResponsibilityAdmin(admin.ModelAdmin):
    list_display = ('vacancy', 'title', 'description', 'created_at', 'updated_at')
    search_fields = ('vacancy__title', 'title')

@admin.register(VacancyRequirement)
class VacancyRequirementAdmin(admin.ModelAdmin):
    list_display = ('vacancy', 'title', 'description', 'created_at', 'updated_at')
    search_fields = ('vacancy__title', 'title')

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('vacancy', 'user', 'created_at', 'updated_at')
    search_fields = ('vacancy__title', 'user__username', 'user__email')
