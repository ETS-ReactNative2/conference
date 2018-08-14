# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0019_auto_20180809_0524'),
    ]

    operations = [
        migrations.AddField(
            model_name='conferenceuser',
            name='project_request',
            field=models.ForeignKey(related_name='member_requests', blank=True, to='attendees.Project', null=True),
        ),
        migrations.AlterField(
            model_name='conferenceuser',
            name='project',
            field=models.ForeignKey(related_name='members', blank=True, to='attendees.Project', null=True),
        ),
    ]
