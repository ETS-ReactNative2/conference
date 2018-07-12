from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^investors/', views.investors),
    url(r'^projects/', views.projects),
    url(r'^users/', views.users),
]
