# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_ticket_sizes(apps, schema_editor):
    TicketSize = apps.get_model('attendees', 'TicketSize')
    TicketSize.objects.create(id=1, min=0, max=5000)
    TicketSize.objects.create(id=2, min=5000, max=25000)
    TicketSize.objects.create(id=3, min=25000, max=100000)
    TicketSize.objects.create(id=4, min=100000, max=1000000)
    TicketSize.objects.create(id=5, min=1000000, max=10000000)
    TicketSize.objects.create(id=6, min=10000000, max=2147483647)


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0003_token_authentication'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketSize',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('min', models.PositiveIntegerField()),
                ('max', models.PositiveIntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='investor',
            name='max_ticket',
        ),
        migrations.RemoveField(
            model_name='investor',
            name='min_ticket',
        ),
        migrations.AddField(
            model_name='investor',
            name='ticket_sizes',
            field=models.ManyToManyField(to='attendees.TicketSize', blank=True),
        ),
        migrations.RunPython(create_ticket_sizes),
    ]
