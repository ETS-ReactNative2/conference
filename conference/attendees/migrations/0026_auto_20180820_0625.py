# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0025_projectmember'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='region',
            field=models.ForeignKey(blank=True, to='attendees.Region', null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='region_other_text',
            field=models.CharField(default='', max_length=40, blank=True),
        ),
    ]
