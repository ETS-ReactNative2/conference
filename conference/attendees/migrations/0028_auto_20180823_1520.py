# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


def migrate_names(apps, schema_editor):
    ConferenceUser = apps.get_model('attendees', 'ConferenceUser')
    for conference_user in ConferenceUser.objects.all():
        conference_user.first_name = conference_user.user.first_name
        conference_user.last_name = conference_user.user.last_name
        conference_user.user.first_name = ''
        conference_user.user.last_name = ''


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0027_conferenceuser_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='conferenceuser',
            name='first_name',
            field=models.CharField(default='', max_length=30, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='last_name',
            field=models.CharField(default='', max_length=30, blank=True),
        ),
        migrations.AddField(
            model_name='investor',
            name='email',
            field=models.EmailField(max_length=254, unique=True, null=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='user',
            field=models.OneToOneField(related_name='conference_user', null=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.RunPython(migrate_names),
    ]
