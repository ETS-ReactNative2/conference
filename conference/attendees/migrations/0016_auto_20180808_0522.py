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
        ('attendees', '0015_auto_20180807_0937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conferenceuser',
            name='company',
            field=models.TextField(default='', blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='facebook',
            field=models.CharField(default='', max_length=50, blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='linkedin',
            field=models.CharField(default='', max_length=50, blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='telegram',
            field=models.CharField(default='', max_length=32, blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='title',
            field=models.TextField(default='', blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='twitter',
            field=models.CharField(default='', max_length=15, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='id',
            field=models.IntegerField(default=0, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.RunPython(init_conferenceuser_id),
        migrations.AlterField(
            model_name='conferenceuser',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='user',
            field=models.OneToOneField(related_name='conference_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='investor',
            field=models.ForeignKey(related_name='users', blank=True, to='attendees.Investor', null=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='project',
            field=models.ForeignKey(related_name='users', blank=True, to='attendees.Project', null=True),
        ),
    ]
