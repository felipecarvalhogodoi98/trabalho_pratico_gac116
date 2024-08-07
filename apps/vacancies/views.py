from rest_framework import generics, permissions
from .models import Vacancy, VacancyBenefit, VacancyResponsibility, VacancyRequirement, Application
from .serializers import VacancySerializer, VacancyBenefitSerializer, VacancyResponsibilitySerializer, VacancyRequirementSerializer, ApplicationSerializer, ApplicationSerializerByUser, VacancyWithApplicationsSerializer

class VacancyListCreateView(generics.ListCreateAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class VacancyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    permission_classes = [permissions.IsAuthenticated]

class VacancyBenefitListCreateView(generics.ListCreateAPIView):
    queryset = VacancyBenefit.objects.all()
    serializer_class = VacancyBenefitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        vacancy = Vacancy.objects.get(pk=self.kwargs['vacancy_pk'])
        serializer.save(vacancy=vacancy)

class VacancyResponsibilityListCreateView(generics.ListCreateAPIView):
    queryset = VacancyResponsibility.objects.all()
    serializer_class = VacancyResponsibilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        vacancy = Vacancy.objects.get(pk=self.kwargs['vacancy_pk'])
        serializer.save(vacancy=vacancy)

class VacancyRequirementListCreateView(generics.ListCreateAPIView):
    queryset = VacancyRequirement.objects.all()
    serializer_class = VacancyRequirementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        vacancy = Vacancy.objects.get(pk=self.kwargs['vacancy_pk'])
        serializer.save(vacancy=vacancy)

class ApplicationListCreateView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        vacancy = Vacancy.objects.get(pk=self.kwargs['vacancy_pk'])
        serializer.save(vacancy=vacancy, user=self.request.user)

class ApplicationListByUserView(generics.ListAPIView):
    serializer_class = ApplicationSerializerByUser
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

class VacancyWithApplicationsListView(generics.ListAPIView):
    serializer_class = VacancyWithApplicationsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Vacancy.objects.filter(user=user).prefetch_related('applications')