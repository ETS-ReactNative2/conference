# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0030_auto_20180824_0917'),
    ]

    operations = [
        migrations.RenameField(
            model_name='professional',
            old_name='is_relocate',
            new_name='relocate',
        ),
    ]
