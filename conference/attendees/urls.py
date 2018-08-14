from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^investors/$', views.ListInvestor.as_view(), name='investor_list'),
    url(r'^investors/(?P<pk>\d+)/$', views.RetrieveInvestor.as_view(), name='investor_detail'),
    url(r'^my_investor/$', views.MyInvestor.as_view(), name='my_investor'),
    url(r'^my_person/$', views.MyPerson.as_view(), name='my_person'),
    url(r'^my_professional/$', views.MyProfessional.as_view(), name='my_professional'),
    url(r'^my_project/$', views.MyProject.as_view(), name='my_project'),
    url(r'^my_project/jobs/$', views.MyProjectJobs.as_view(), name='my_project_jobs'),
    url(r'^my_project/jobs/(?P<pk>\d+)/$', views.MyProjectJobsId.as_view(), name='my_project_jobs_id'),
    url(r'^my_project/members/$', views.MyProjectMembers.as_view(), name='my_project_members'),
    url(r'^my_project/members/(?P<pk>\d+)/$', views.MyProjectMembersId.as_view(), name='my_project_members_id'),
    url(r'^professionals/$', views.Professionals.as_view(), name='professionals'),

    url(r'^projects/$', views.ListProject.as_view(), name='project_list'),
    url(r'^projects/(?P<pk>\d+)/$', views.RetrieveProject.as_view(), name='project_detail'),
    url(r'^users/$', views.ListCreateUser.as_view(), name='user_list'),
    url(r'^users/(?P<pk>\d+)/$', views.users_id, name='user_detail'),
]
