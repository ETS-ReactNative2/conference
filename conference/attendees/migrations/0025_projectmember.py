# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0024_auto_20180817_0549'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectMember',
            fields=[
                ('email', models.EmailField(max_length=254, serialize=False, primary_key=True)),
                ('project', models.ForeignKey(to='attendees.Project')),
            ],
        ),
    ]
