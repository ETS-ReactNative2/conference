from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^screen_names/$', views.screen_names),
]
