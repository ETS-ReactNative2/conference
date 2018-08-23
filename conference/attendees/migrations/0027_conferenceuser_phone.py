# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0026_auto_20180820_0625'),
    ]

    operations = [
        migrations.AddField(
            model_name='conferenceuser',
            name='phone',
            field=models.CharField(default='', max_length=20, blank=True),
        ),
    ]
