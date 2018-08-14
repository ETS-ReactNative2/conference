# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models, migrations
from django.conf import settings


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
    ]
