# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0016c_auto_20180808_0522'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='notable',
            field=models.CharField(default='', max_length=250, blank=True),
        ),
    ]
