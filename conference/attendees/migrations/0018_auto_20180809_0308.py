# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0017_auto_20180808_1353'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conferenceuser',
            name='company',
            field=models.CharField(default='', max_length=40, blank=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='title',
            field=models.CharField(default='', max_length=40, blank=True),
        ),
    ]
