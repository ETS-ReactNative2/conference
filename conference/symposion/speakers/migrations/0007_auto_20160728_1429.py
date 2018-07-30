# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('symposion_speakers', '0006_auto_20160727_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speaker',
            name='biography',
            field=models.TextField(help_text="A little bit about you.  Edit using <a href='http://daringfireball.net/projects/markdown/basics' target='_blank'>Markdown</a>.", verbose_name='Biography', blank=True),
        ),
    ]
