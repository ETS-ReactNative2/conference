# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smatched', '0003_status'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Status',
            new_name='TwitterStatus',
        ),
    ]
