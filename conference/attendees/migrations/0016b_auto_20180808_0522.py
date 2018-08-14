# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models, migrations
from django.conf import settings


def init_conferenceuser_id(apps, schema_editor):
    ConferenceUser = apps.get_model('attendees', 'ConferenceUser')
    for conference_user in ConferenceUser.objects.all():
        conference_user.id = conference_user.user.id
        conference_user.save()


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0016a_auto_20180808_0522'),
    ]

    operations = [
        migrations.RunPython(init_conferenceuser_id),
    ]
