from django.urls import path, include
from .views import RegisterView, UserListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('list/', UserListView.as_view(), name='user-list'),
]