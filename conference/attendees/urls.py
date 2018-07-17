from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^investors/$', views.investors),
    url(r'^investors/(?P<pk>\d+)/$', views.investors_id),
    url(r'^projects/$', views.projects),
    url(r'^projects/(?P<pk>\d+)/$', views.projects_id),
    url(r'^users/$', views.users),
    url(r'^users/(?P<pk>\d+)/$', views.users_id),
]
