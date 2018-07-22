# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('symposion_speakers', '0005_added_better_phone_number_validation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speaker',
            name='phone_number',
            field=models.CharField(max_length=40, verbose_name='Phone number'),
        ),
    ]
