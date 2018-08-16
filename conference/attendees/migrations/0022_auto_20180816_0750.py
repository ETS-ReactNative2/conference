# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0021_auto_20180815_0855'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='image_url',
            field=models.URLField(default='', blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='is_sponsor',
            field=models.BooleanField(default=False, db_index=True),
        ),
    ]
