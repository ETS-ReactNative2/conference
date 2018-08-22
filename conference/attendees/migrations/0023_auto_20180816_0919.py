# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0022_auto_20180816_0750'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='joblisting',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='professional',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='professional',
            name='traits',
        ),
        migrations.AddField(
            model_name='joblisting',
            name='skills_text',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='professional',
            name='skills_text',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='professional',
            name='traits_text',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
        migrations.DeleteModel(
            name='Skill',
        ),
        migrations.DeleteModel(
            name='Trait',
        ),
    ]
