# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0033_conferenceuser_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conferenceuser',
            name='image_url',
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='guid',
            field=models.CharField(max_length=16, blank=True),
        ),
    ]
