from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^investors/$', views.ListCreateInvestor.as_view(), name='investor_list'),
    url(r'^investors/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyInvestor.as_view(), name='investor_detail'),
    url(r'^jobs/$', views.CreateJob.as_view(), name='job_list'),
    url(r'^persons/$', views.CreatePerson.as_view(), name='person_create'),
    url(r'^projects/$', views.ListProject.as_view(), name='project_list'),
    url(r'^create_update_project/$', views.CreateUpdateProject.as_view(), name='create_update_project'),
    url(r'^projects/(?P<pk>\d+)/$', views.RetrieveUpdateDestroyProject.as_view(), name='project_detail'),
    url(r'^users/$', views.ListCreateUser.as_view(), name='user_list'),
    url(r'^users/(?P<pk>\d+)/$', views.users_id, name='user_detail'),
]
