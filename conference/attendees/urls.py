from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^investors/', views.investors),
    url(r'^investors/<int:investor_id>/', views.investors_id),
    url(r'^projects/', views.projects),
    url(r'^projects/<int:project_id>/', views.projects_id),
    url(r'^users/', views.users),
    url(r'^users/<int:user_id>/', views.users_id),
]
