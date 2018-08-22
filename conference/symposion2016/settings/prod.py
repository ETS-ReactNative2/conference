import dj_database_url
from .base import *
import socket

DEBUG = False

# ELB HealthCheck uses the EC2 instance's IP for its Host header
local_ip = str(socket.gethostbyname(socket.gethostname()))

ALLOWED_HOSTS = [local_ip, ".pycon.ca", ".compute.amazonaws.com", ".elasticbeanstalk.com"]

if 'DATABASE_URL' not in os.environ:
    raise ValueError("DATABASE_URL must be specified")
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

MEDIA_ROOT = os.path.join(PROJECT_ROOT, os.pardir, "public", "media")
MEDIA_URL = "/media/"
STATIC_ROOT = os.path.join(PROJECT_ROOT, os.pardir, "public", "static")
STATIC_URL = "/static/"

MIDDLEWARE_CLASSES = ['django.middleware.security.SecurityMiddleware'] + MIDDLEWARE_CLASSES
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
# setting CSRF_COOKIE_HTTPONLY to True breaks markitup preview ajax loading
# https://bitbucket.org/zsiciarz/django-markitup/issues/23/csrf_cookie_httponly-breaks-preview
CSRF_COOKIE_HTTPONLY = False
X_FRAME_OPTIONS = 'DENY'
# Debugging login problem
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
#AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend',)
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_AGE = 86400 # sec
SESSION_COOKIE_DOMAIN = None
SESSION_COOKIE_NAME = 'DSESSIONID'

# Symposion

DEFAULT_HTTP_PROTOCOL = 'https'
ACCOUNT_EMAIL_CONFIRMATION_REQUIRED = True

WEBHOOKS = {
    'default': {
        'url': 'https://pyconca.slack.com/services/hooks/slackbot',
        'params': {'token': os.environ.get('SLACKBOT_TOKEN'), 'channel': '#programme'},
        'headers': {'Content-Type': 'text/plain; charset=utf-8'}
    }
}

