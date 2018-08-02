# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0004_auto_20180801_0358'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='investor',
            name='funding_stages',
        ),
        migrations.RemoveField(
            model_name='investor',
            name='giveaways',
        ),
        migrations.RemoveField(
            model_name='investor',
            name='product_stages',
        ),
        migrations.RemoveField(
            model_name='investor',
            name='ticket_sizes',
        ),
        migrations.RemoveField(
            model_name='investor',
            name='token_types',
        ),
        migrations.RemoveField(
            model_name='project',
            name='funding_stage',
        ),
        migrations.RemoveField(
            model_name='project',
            name='giveaway',
        ),
        migrations.RemoveField(
            model_name='project',
            name='product_stage',
        ),
        migrations.RemoveField(
            model_name='project',
            name='token_type',
        ),
        migrations.DeleteModel(
            name='Investor',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
        migrations.DeleteModel(
            name='Company',
        ),
    ]
