# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0009_jobrole'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='telegram',
            field=models.CharField(default='', max_length=32, blank=True),
        ),
    ]
