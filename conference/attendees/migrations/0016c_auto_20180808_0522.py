# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0016b_auto_20180808_0522'),
    ]

    operations = [
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
