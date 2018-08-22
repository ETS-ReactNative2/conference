# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0020_auto_20180810_0545'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conferenceuser',
            name='investor',
            field=models.OneToOneField(related_name='conference_user', null=True, on_delete=django.db.models.deletion.SET_NULL, blank=True, to='attendees.Investor'),
        ),
        migrations.AlterField(
            model_name='project',
            name='size',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
