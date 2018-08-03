# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_job_roles(apps, schema_editor):
    JobRole = apps.get_model('attendees', 'JobRole')
    JobRole.objects.create(id=1, name='Chief Executive Officer')
    JobRole.objects.create(id=2, name='Community Manager')
    JobRole.objects.create(id=3, name='Designer')
    JobRole.objects.create(id=4, name='Data Scientist')
    JobRole.objects.create(id=5, name='Developer, Backend')
    JobRole.objects.create(id=6, name='Developer, Frontend')
    JobRole.objects.create(id=7, name='Developer, Full Stack')
    JobRole.objects.create(id=8, name='Marketing')
    JobRole.objects.create(id=9, name='Machine Learning Engineer')
    JobRole.objects.create(id=10, name='Quality Assurance Engineer')
    JobRole.objects.create(id=11, name='Sales')
    JobRole.objects.create(id=12, name='Other')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0008_auto_20180802_0417'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobRole',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.RunPython(create_job_roles),
    ]
