# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_region_other(apps, schema_editor):
    Region = apps.get_model('attendees', 'Region')
    Region.objects.create(id=4, name='OTHER')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0012_auto_20180806_0725'),
    ]

    operations = [
        migrations.AddField(
            model_name='investor',
            name='region_other_text',
            field=models.CharField(default='', max_length=40, blank=True),
        ),
        migrations.RunPython(create_region_other),
    ]
