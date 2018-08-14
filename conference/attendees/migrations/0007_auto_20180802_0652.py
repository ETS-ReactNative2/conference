# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_regions(apps, schema_editor):
    Region = apps.get_model('attendees', 'Region')
    Region.objects.create(id=1, name='ANYWHERE')
    Region.objects.create(id=2, name='ANYWHERE_EXCEPT_UNITED_STATES')
    Region.objects.create(id=3, name='SOUTH_KOREA_ONLY')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0006_industry_investor_project'),
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='investor',
            name='nationality',
            field=models.CharField(default='', max_length=2, blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='legal_country',
            field=models.CharField(default='', max_length=2, blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='main_country',
            field=models.CharField(default='', max_length=2, blank=True),
        ),
        migrations.AddField(
            model_name='investor',
            name='region',
            field=models.ForeignKey(default='', blank=True, to='attendees.Region', null=True),
        ),
        migrations.RunPython(create_regions),
    ]
