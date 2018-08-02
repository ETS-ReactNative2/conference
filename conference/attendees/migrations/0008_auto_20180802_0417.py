# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0007_auto_20180802_0652'),
    ]

    operations = [
        migrations.AddField(
            model_name='conferenceuser',
            name='company',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='facebook',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='linkedin',
            field=models.CharField(max_length=50, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='telegram',
            field=models.CharField(max_length=32, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='title',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='twitter',
            field=models.CharField(max_length=15, blank=True),
        ),
    ]
