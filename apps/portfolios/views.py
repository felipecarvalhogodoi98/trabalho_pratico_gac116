from rest_framework import generics, permissions
from .models import Portfolio, PortfolioCertificate, PortfolioSkill, PortfolioProject
from .serializers import PortfolioSerializer, PortfolioCertificateSerializer, PortfolioSkillSerializer, PortfolioProjectSerializer

class PortfolioListCreateView(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PortfolioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

class PortfolioCertificateListCreateView(generics.ListCreateAPIView):
    queryset = PortfolioCertificate.objects.all()
    serializer_class = PortfolioCertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        portfolio = Portfolio.objects.get(pk=self.kwargs['portfolio_pk'])
        serializer.save(portfolio=portfolio)

class PortfolioSkillListCreateView(generics.ListCreateAPIView):
    queryset = PortfolioSkill.objects.all()
    serializer_class = PortfolioSkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        portfolio = Portfolio.objects.get(pk=self.kwargs['portfolio_pk'])
        serializer.save(portfolio=portfolio)

class PortfolioProjectListCreateView(generics.ListCreateAPIView):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        portfolio = Portfolio.objects.get(pk=self.kwargs['portfolio_pk'])
        serializer.save(portfolio=portfolio)
class UserPortfoliosView(generics.ListAPIView):
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user)

class PortfolioUpdateView(generics.UpdateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Portfolio.objects.filter(user=self.request.user)
    
class PortfolioCertificateUpdateView(generics.UpdateAPIView):
    queryset = PortfolioCertificate.objects.all()
    serializer_class = PortfolioCertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioCertificate.objects.filter(portfolio__user=self.request.user)
    
class PortfolioSkillUpdateView(generics.UpdateAPIView):
    queryset = PortfolioSkill.objects.all()
    serializer_class = PortfolioSkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioSkill.objects.filter(portfolio__user=self.request.user) 

class PortfolioProjectUpdateView(generics.UpdateAPIView):
    queryset = PortfolioProject.objects.all()
    serializer_class = PortfolioProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioProject.objects.filter(portfolio__user=self.request.user)    