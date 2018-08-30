from django.conf.urls import include, url
from django.contrib import admin
from .views import *
from .views_investor import *
from .views_project import *

urlpatterns = [
    url(r'^investors/$', ListInvestor.as_view(), name='investor_list'),
    url(r'^investors/defaults/$', InvestorsDefaults.as_view(), name='investors_defaults'),
    url(r'^investors/(?P<pk>\d+)/$', RetrieveInvestor.as_view(), name='investor_detail'),
    url(r'^investors/(?P<pk>\d+)/messages/$', InvestorsIdMessages.as_view(), name='investors_id_messages'),
    url(r'^jobs/$', Jobs.as_view(), name='jobs'),
    url(r'^my_investor/$', MyInvestor.as_view(), name='my_investor'),
    url(r'^my_investor/deactivate/$', MyInvestorDeactivate.as_view(), name='my_investor_deactivate'),
    url(r'^my_investor/reactivate/$', MyInvestorReactivate.as_view(), name='my_investor_reactivate'),
    url(r'^my_person/$', MyPerson.as_view(), name='my_person'),
    url(r'^my_person/images/$', MyPersonImages.as_view(), name='my_person_images'),
    url(r'^my_professional/$', MyProfessional.as_view(), name='my_professional'),
    url(r'^my_professional/deactivate/$', MyProfessionalDeactivate.as_view(), name='my_professional_deactivate'),
    url(r'^my_professional/reactivate/$', MyProfessionalReactivate.as_view(), name='my_professional_reactivate'),
    url(r'^my_project/$', MyProject.as_view(), name='my_project'),
    url(r'^my_project/jobs/$', MyProjectJobs.as_view(), name='my_project_jobs'),
    url(r'^my_project/jobs/(?P<pk>\d+)/$', MyProjectJobsId.as_view(), name='my_project_jobs_id'),
    url(r'^my_project/leave/$', MyProjectLeave.as_view(), name='my_project_leave'),
    url(r'^my_project/members/$', MyProjectMembers.as_view(), name='my_project_members'),
    url(r'^my_project/members/(?P<pk>\d+)/$', MyProjectMembersId.as_view(), name='my_project_members_id'),
    url(r'^professionals/$', Professionals.as_view(), name='professionals'),
    url(r'^professionals/defaults/$', ProfessionalsDefaults.as_view(), name='professionals_defaults'),
    url(r'^projects/$', ListProject.as_view(), name='project_list'),
    url(r'^projects/defaults/$', ProjectsDefaults.as_view(), name='projects_defaults'),
    url(r'^projects/(?P<pk>\d+)/$', RetrieveProject.as_view(), name='project_detail'),
    url(r'^users/$', ListCreateUser.as_view(), name='user_list'),
    url(r'^users/(?P<pk>\d+)/$', users_id, name='user_detail'),
]
