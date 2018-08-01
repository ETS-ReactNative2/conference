# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smatched', '0002_smatcheduser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id_str', models.CharField(max_length=18, serialize=False, primary_key=True)),
                ('text', models.CharField(max_length=280)),
                ('user_screen_name', models.CharField(max_length=15)),
            ],
        ),
    ]
