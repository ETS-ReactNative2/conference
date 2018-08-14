# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def create_industries(apps, schema_editor):
    Industry = apps.get_model('attendees', 'Industry')
    Industry.objects.create(id=1, name='accounting')
    Industry.objects.create(id=2, name='agriculture')
    Industry.objects.create(id=3, name='airlines')
    Industry.objects.create(id=4, name='architecture')
    Industry.objects.create(id=5, name='art')
    Industry.objects.create(id=6, name='automotive')
    Industry.objects.create(id=7, name='banking')
    Industry.objects.create(id=8, name='bars_restaurants')
    Industry.objects.create(id=9, name='broadcasting')
    Industry.objects.create(id=10, name='casinos')
    Industry.objects.create(id=11, name='construction')
    Industry.objects.create(id=12, name='defense')
    Industry.objects.create(id=13, name='education')
    Industry.objects.create(id=14, name='electronics')
    Industry.objects.create(id=15, name='energy')
    Industry.objects.create(id=16, name='entertainment')
    Industry.objects.create(id=17, name='environment')
    Industry.objects.create(id=18, name='finance')
    Industry.objects.create(id=19, name='green_energy')
    Industry.objects.create(id=20, name='hardware')
    Industry.objects.create(id=21, name='health')
    Industry.objects.create(id=22, name='human_resources')
    Industry.objects.create(id=23, name='human_rights')
    Industry.objects.create(id=24, name='insurance')
    Industry.objects.create(id=25, name='internet')
    Industry.objects.create(id=26, name='legal')
    Industry.objects.create(id=27, name='manufacturing')
    Industry.objects.create(id=28, name='marketing')
    Industry.objects.create(id=29, name='non_profit')
    Industry.objects.create(id=30, name='pharmaceuticals')
    Industry.objects.create(id=31, name='policy')
    Industry.objects.create(id=32, name='public_relations')
    Industry.objects.create(id=33, name='publishing')
    Industry.objects.create(id=34, name='real_estate')
    Industry.objects.create(id=35, name='retail')
    Industry.objects.create(id=36, name='sales')
    Industry.objects.create(id=37, name='sports')
    Industry.objects.create(id=38, name='supply_chain')
    Industry.objects.create(id=39, name='transportation')
    Industry.objects.create(id=40, name='venture_capital')
    Industry.objects.create(id=41, name='other')


class Migration(migrations.Migration):

    dependencies = [
        ('attendees', '0005_auto_20180802_1004'),
    ]

    operations = [
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.RunPython(create_industries),
        migrations.CreateModel(
            name='Investor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('funding_stages', models.ManyToManyField(to='attendees.FundingStage', blank=True)),
                ('giveaways', models.ManyToManyField(to='attendees.Giveaway', blank=True)),
                ('industries', models.ManyToManyField(to='attendees.Industry', blank=True)),
                ('product_stages', models.ManyToManyField(to='attendees.ProductStage', blank=True)),
                ('ticket_sizes', models.ManyToManyField(to='attendees.TicketSize', blank=True)),
                ('token_types', models.ManyToManyField(to='attendees.TokenType', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.TextField(default='', blank=True)),
                ('fundraising_amount', models.DecimalField(db_index=True, null=True, max_digits=12, decimal_places=0, blank=True)),
                ('github', models.CharField(default='', max_length=140, blank=True)),
                ('name', models.CharField(default='', max_length=255, blank=True)),
                ('news', models.URLField(default='', blank=True)),
                ('notable', models.TextField(default='', blank=True)),
                ('tagline', models.CharField(default='', max_length=255, blank=True)),
                ('telegram', models.CharField(default='', max_length=32)),
                ('twitter', models.CharField(default='', max_length=15, blank=True)),
                ('website', models.URLField(default='', blank=True)),
                ('whitepaper', models.URLField(default='', blank=True)),
                ('funding_stage', models.ForeignKey(blank=True, to='attendees.FundingStage', null=True)),
                ('giveaway', models.ForeignKey(blank=True, to='attendees.Giveaway', null=True)),
                ('product_stage', models.ForeignKey(blank=True, to='attendees.ProductStage', null=True)),
                ('token_type', models.ForeignKey(blank=True, to='attendees.TokenType', null=True)),
            ],
        ),
    ]
