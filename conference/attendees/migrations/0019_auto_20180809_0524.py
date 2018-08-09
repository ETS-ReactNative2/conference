# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0018_auto_20180809_0308'),
    ]

    operations = [
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('know_most', models.CharField(default='', max_length=60, blank=True)),
                ('country', models.CharField(default='', max_length=2, blank=True)),
                ('city', models.CharField(default='', max_length=40, blank=True)),
                ('age', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('experience', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('local_remote_options', models.ManyToManyField(to='attendees.LocalRemoteOption', blank=True)),
                ('role', models.ForeignKey(blank=True, to='attendees.JobRole', null=True)),
                ('skills', models.ManyToManyField(to='attendees.Skill', blank=True)),
                ('traits', models.ManyToManyField(to='attendees.Trait', blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='joblisting',
            name='description',
            field=models.CharField(default='', max_length=250, blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='professional',
            field=models.OneToOneField(related_name='user', null=True, on_delete=django.db.models.deletion.SET_NULL, blank=True, to='attendees.Professional'),
        ),
    ]
