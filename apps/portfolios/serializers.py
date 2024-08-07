from rest_framework import serializers
from apps.users.models  import CustomUser
from .models import Portfolio, PortfolioCertificate, PortfolioSkill, PortfolioProject

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'avatar')

class PortfolioCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioCertificate
        fields = ('id', 'description', 'created_at', 'updated_at')

class PortfolioSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioSkill
        fields = ('id', 'description', 'created_at', 'updated_at')

class PortfolioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioProject
        fields = ('id', 'description', 'image', 'link_git', 'link_site', 'created_at', 'updated_at')

class PortfolioSerializer(serializers.ModelSerializer):
    certificates = PortfolioCertificateSerializer(many=True, read_only=True)
    skills = PortfolioSkillSerializer(many=True, read_only=True)
    projects = PortfolioProjectSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Portfolio
        fields = ('id', 'user', 'description', 'created_at', 'updated_at', 'certificates', 'skills', 'projects')
