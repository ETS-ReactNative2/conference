# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_services(apps, schema_editor):
    Service = apps.get_model('attendees', 'Service')
    Service.objects.create(id=1, name='Community Management')
    Service.objects.create(id=2, name='Telegram Promotion')
    Service.objects.create(id=3, name='Investor Relations')
    Service.objects.create(id=4, name='Marketing and PR')
    Service.objects.create(id=5, name='General Advisory')
    Service.objects.create(id=6, name='KYC/AML')
    Service.objects.create(id=7, name='Legal Consulting')
    Service.objects.create(id=8, name='Tokenomics Consulting')
    Service.objects.create(id=9, name='Web Development')
    Service.objects.create(id=10, name='Mobile Development')
    Service.objects.create(id=11, name='Web and Mobile Design')
    Service.objects.create(id=12, name='UX Design')
    Service.objects.create(id=13, name='Smart Contract Development')
    Service.objects.create(id=14, name='Smart Contract/Security Auditing')
    Service.objects.create(id=15, name='Exchange services/Payment support')
    Service.objects.create(id=16, name='Hiring & HR')
    Service.objects.create(id=17, name='Event Organization')
    Service.objects.create(id=18, name='Other (comma separated)')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0023_auto_20180816_0919'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='services_consumed_other_text',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='services_provided_other_text',
            field=models.CharField(default='', max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='services_consumed',
            field=models.ManyToManyField(related_name='projects_consuming', to='attendees.Service', blank=True),
        ),
        migrations.AddField(
            model_name='project',
            name='services_provided',
            field=models.ManyToManyField(related_name='projects_providing', to='attendees.Service', blank=True),
        ),
        migrations.RunPython(create_services),
    ]
