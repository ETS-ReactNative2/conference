# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0032_auto_20180829_1238'),
    ]

    operations = [
        migrations.AddField(
            model_name='conferenceuser',
            name='image_url',
            field=models.URLField(default='', blank=True),
        ),
    ]
