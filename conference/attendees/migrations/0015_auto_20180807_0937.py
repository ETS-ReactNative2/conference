# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0014_auto_20180807_0510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.CharField(default='', max_length=250, blank=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='fundraising_amount',
            field=models.PositiveIntegerField(default=0, db_index=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='legal_country',
            field=models.CharField(max_length=2, db_index=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='main_country',
            field=models.CharField(max_length=2, db_index=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='project',
            name='tagline',
            field=models.CharField(default='', max_length=60, blank=True),
        ),
    ]
