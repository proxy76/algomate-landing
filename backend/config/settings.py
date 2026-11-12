"""
Django settings for the AlgoMate backend.

The whole backend is one unauthenticated JSON endpoint, POST /api/contact/,
reached through nginx (deploy/nginx/algomate.conf.example). There are no
sessions, no cookies, no admin and no models.
"""

import os
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')

DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')

# Fail at startup, not on the first request that happens to need it.
SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY:
    raise ImproperlyConfigured('SECRET_KEY is not set — see backend/.env.example')

ALLOWED_HOSTS = [h.strip() for h in os.getenv('ALLOWED_HOSTS', '').split(',') if h.strip()]
CORS_ALLOWED_ORIGINS = [o.strip() for o in os.getenv('CORS_ALLOWED_ORIGINS', '').split(',') if o.strip()]
# The form is the only client and it only ever POSTs JSON.
CORS_ALLOW_METHODS = ['POST', 'OPTIONS']

# Email Configuration
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# Without this a hung SMTP connection holds the only gunicorn worker until
# gunicorn kills it, and the form is down for everybody in the meantime.
EMAIL_TIMEOUT = 15
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
CONTACT_RECIPIENT_EMAIL = os.getenv('CONTACT_RECIPIENT_EMAIL', EMAIL_HOST_USER or '')


INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'rest_framework',
    'corsheaders',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Nothing is stored. The entry exists because DRF imports django.contrib.auth,
# which wants a default database configured; no table is ever queried.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# In-memory cache is enough for the rate limits since the contact endpoint is
# handled by a single process (gunicorn --workers 1, deploy/systemd/
# algomate.service). With more workers each would keep its own counters and
# every limit below would silently multiply — swap for Redis first.
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'contact-ratelimit',
    }
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    # JSON in, JSON out. The defaults also enable the browsable HTML API and
    # form/multipart parsing, neither of which this endpoint has a use for.
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/hour',
        'contact': '5/hour',
    },
    # WHO A THROTTLE COUNTS AGAINST. nginx is the only thing that can reach
    # gunicorn, and it overwrites X-Forwarded-For with the one address it
    # trusts — the visitor's, restored from Cloudflare's CF-Connecting-IP by
    # the real_ip directives in the nginx config. NUM_PROXIES = 1 makes DRF
    # take exactly that last hop and ignore anything a client typed in.
    #
    # Until 2026-11-12 nginx sent its own peer address here, which is always
    # 127.0.0.1 behind the tunnel: every visitor shared one bucket, so five
    # submissions an hour from anyone — or five junk POSTs from one bot —
    # locked the enrolment form for the whole internet.
    'NUM_PROXIES': 1,
}

# The largest legitimate body is a 2000-character message plus four short
# fields. nginx caps /api/ as well; this is the backstop.
DATA_UPLOAD_MAX_MEMORY_SIZE = 32 * 1024

# Security headers (SecurityMiddleware / XFrameOptionsMiddleware)
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
# TLS terminates at Cloudflare; nginx states the public scheme.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
