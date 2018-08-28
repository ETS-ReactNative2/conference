# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0028_auto_20180823_1520'),
    ]

    operations = [
        migrations.AddField(
            model_name='professional',
            name='is_relocate',
            field=models.BooleanField(default=False),
        ),
    ]
