from rest_framework import serializers
from apps.users.models  import CustomUser
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'avatar')

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id', 'vacancy', 'user', 'created_at', 'updated_at')
class VacancySerializer(serializers.ModelSerializer):
    benefits = VacancyBenefitSerializer(many=True, read_only=True)
    responsibilities = VacancyResponsibilitySerializer(many=True, read_only=True)
    requirements = VacancyRequirementSerializer(many=True, read_only=True)
    applications = ApplicationSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vacancy
        fields = ('id', 'user', 'title', 'description', 'created_at', 'updated_at', 'benefits', 'responsibilities', 'requirements', 'applications', 'user')

class ApplicationSerializerByUser(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    vacancy = VacancySerializer(read_only=True)
    class Meta:
        model = Application
        fields = ('id', 'vacancy', 'user', 'created_at', 'updated_at')

class ApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='user.username')
    applicant_email = serializers.EmailField(source='user.email')

    class Meta:
        model = Application
        fields = ['id', 'applicant_name', 'applicant_email', 'created_at']

class VacancyWithApplicationsSerializer(serializers.ModelSerializer):
    applications = ApplicationSerializer(many=True)

    class Meta:
        model = Vacancy
        fields = ['id', 'title', 'description', 'applications']