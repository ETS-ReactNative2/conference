# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smatched', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SmatchedUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('messenger_user_id', models.BigIntegerField(db_index=True)),
                ('first_name', models.TextField(blank=True)),
                ('last_name', models.TextField(blank=True)),
                ('timezone', models.TextField(blank=True)),
                ('gender', models.TextField(blank=True)),
                ('last_clicked_button_name', models.TextField(blank=True)),
                ('profile_pic_url', models.TextField(blank=True)),
                ('chatfuel_user_id', models.TextField(blank=True)),
                ('last_user_freeform_input', models.TextField(blank=True)),
                ('source', models.TextField(blank=True)),
                ('locale', models.TextField(blank=True)),
                ('last_visited_block_name', models.TextField(blank=True)),
                ('last_visited_block_id', models.TextField(blank=True)),
                ('ref', models.TextField(blank=True)),
                ('twitter', models.TextField(blank=True)),
                ('okc', models.TextField(blank=True)),
                ('linkedin', models.TextField(blank=True)),
            ],
        ),
    ]
