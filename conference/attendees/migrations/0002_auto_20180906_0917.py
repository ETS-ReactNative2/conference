# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0001_squashed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conferenceuser',
            name='linkedin',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
    ]
