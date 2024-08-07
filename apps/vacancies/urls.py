from django.urls import path
from .views import (
    VacancyListCreateView,
    VacancyDetailView,
    VacancyBenefitListCreateView,
    VacancyResponsibilityListCreateView,
    VacancyRequirementListCreateView,
    ApplicationListCreateView,
    ApplicationListByUserView,
    VacancyWithApplicationsListView
)

urlpatterns = [
    path('', VacancyListCreateView.as_view(), name='vacancy-list-create'),
    path('<int:pk>/', VacancyDetailView.as_view(), name='vacancy-detail'),
    path('<int:vacancy_pk>/benefits/', VacancyBenefitListCreateView.as_view(), name='vacancy-benefit-list-create'),
    path('<int:vacancy_pk>/responsibilities/', VacancyResponsibilityListCreateView.as_view(), name='vacancy-responsibility-list-create'),
    path('<int:vacancy_pk>/requirements/', VacancyRequirementListCreateView.as_view(), name='vacancy-requirement-list-create'),
    path('<int:vacancy_pk>/applications/', ApplicationListCreateView.as_view(), name='application-list-create'),
    path('user/applications/', ApplicationListByUserView.as_view(), name='user-application-list'),
    path('with-applications/', VacancyWithApplicationsListView.as_view(), name='vacancies-with-applications'),
]
