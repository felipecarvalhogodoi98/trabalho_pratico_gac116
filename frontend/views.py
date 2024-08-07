from django.shortcuts import render

def login(request):
    return render(request, 'login.html')

def register(request):
    return render(request, 'register.html')

def index(request):
    return render(request, 'index.html')

def perfil(request):
    return render(request, 'perfil.html')

def registerVacancy(request):
    return render(request, 'register-vacancy.html')

def applications(request):
    return render(request, 'applications.html')

def portfolios(request):
    return render(request, 'portfolios.html')

def editarPortfolio(request):
    return render(request, 'editPortfolio.html')