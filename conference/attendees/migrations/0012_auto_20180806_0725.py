# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_local_remote_options(apps, schema_editor):
    LocalRemoteOption = apps.get_model('attendees', 'LocalRemoteOption')
    LocalRemoteOption.objects.create(id=1, name='LOCAL')
    LocalRemoteOption.objects.create(id=2, name='REMOTE')


def create_payments(apps, schema_editor):
    Payment = apps.get_model('attendees', 'Payment')
    Payment.objects.create(id=1, name='FIAT')
    Payment.objects.create(id=2, name='TOKEN')
    Payment.objects.create(id=3, name='EQUITY')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0011_auto_20180803_0915'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobListing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('link', models.URLField(default='', blank=True)),
                ('description', models.TextField(default='', blank=True)),
                ('part_time', models.BooleanField(default=False)),
                ('country', models.CharField(default='', max_length=2, blank=True)),
                ('city', models.CharField(default='', max_length=40, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='LocalRemoteOption',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='joblisting',
            name='local_remote_options',
            field=models.ManyToManyField(to='attendees.LocalRemoteOption'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='payments',
            field=models.ManyToManyField(to='attendees.Payment', blank=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='project',
            field=models.ForeignKey(related_name='job_listings', to='attendees.Project'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='role',
            field=models.ForeignKey(to='attendees.JobRole'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='skills',
            field=models.ManyToManyField(to='attendees.Skill', blank=True),
        ),
        migrations.RunPython(create_local_remote_options),
        migrations.RunPython(create_payments),
    ]
