# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0013_investor_region_other_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='industry',
            field=models.ForeignKey(default=41, to='attendees.Industry'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='size',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
    ]
