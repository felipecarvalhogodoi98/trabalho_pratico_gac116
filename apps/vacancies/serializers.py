from rest_framework import serializers
from .models import Vacancy, VacancyBenefit, VacancyResponsibility, VacancyRequirement, Application

class VacancyBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacancyBenefit
        fields = ('id', 'title', 'description', 'created_at', 'updated_at')

class VacancyResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = VacancyResponsibility
        fields = ('id', 'title', 'description', 'created_at', 'updated_at')

class VacancyRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacancyRequirement
        fields = ('id', 'title', 'description', 'created_at', 'updated_at')

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id', 'vacancy', 'user', 'created_at', 'updated_at')

class VacancySerializer(serializers.ModelSerializer):
    benefits = VacancyBenefitSerializer(many=True, read_only=True)
    responsibilities = VacancyResponsibilitySerializer(many=True, read_only=True)
    requirements = VacancyRequirementSerializer(many=True, read_only=True)
    applications = ApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = Vacancy
        fields = ('id', 'user', 'title', 'description', 'created_at', 'updated_at', 'benefits', 'responsibilities', 'requirements', 'applications')
