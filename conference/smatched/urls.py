from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^chatfuelattributes/', include('smatched.chatfuelattributes.urls')),
    url(r'^twitter/', include('smatched.twitter.urls')),
    url(r'^users/', include('smatched.users.urls')),
]
