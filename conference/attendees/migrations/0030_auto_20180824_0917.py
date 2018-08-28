# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0029_professional_is_relocate'),
    ]

    operations = [
        migrations.AddField(
            model_name='investor',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='professional',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
