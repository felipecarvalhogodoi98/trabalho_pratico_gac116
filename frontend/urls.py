from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('perfil', views.perfil, name='perfil'),
    path('cadastrar-vaga', views.registerVacancy, name='registerVacancy'),
    path('aplicacoes', views.applications, name='applications'),
]