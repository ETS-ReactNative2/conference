# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
from django.conf import settings


def create_funding_stages(apps, schema_editor):
    FundingStage = apps.get_model('attendees', 'FundingStage')
    FundingStage.objects.create(id=1, name='SEED')
    FundingStage.objects.create(id=2, name='PRE_ICO')
    FundingStage.objects.create(id=3, name='POST_ICO')


def create_giveaways(apps, schema_editor):
    Giveaway = apps.get_model('attendees', 'Giveaway')
    Giveaway.objects.create(id=1, name='TOKEN')
    Giveaway.objects.create(id=2, name='EQUITY')
    Giveaway.objects.create(id=3, name='BOTH')


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


def create_job_roles(apps, schema_editor):
    JobRole = apps.get_model('attendees', 'JobRole')
    JobRole.objects.create(id=1, name='Chief Executive Officer')
    JobRole.objects.create(id=2, name='Community Manager')
    JobRole.objects.create(id=3, name='Designer')
    JobRole.objects.create(id=4, name='Data Scientist')
    JobRole.objects.create(id=5, name='Developer, Backend')
    JobRole.objects.create(id=6, name='Developer, Frontend')
    JobRole.objects.create(id=7, name='Developer, Full Stack')
    JobRole.objects.create(id=8, name='Marketing')
    JobRole.objects.create(id=9, name='Machine Learning Engineer')
    JobRole.objects.create(id=10, name='Quality Assurance Engineer')
    JobRole.objects.create(id=11, name='Sales')
    JobRole.objects.create(id=12, name='Other')


def create_local_remote_options(apps, schema_editor):
    LocalRemoteOption = apps.get_model('attendees', 'LocalRemoteOption')
    LocalRemoteOption.objects.create(id=1, name='LOCAL')
    LocalRemoteOption.objects.create(id=2, name='REMOTE')


def create_payments(apps, schema_editor):
    Payment = apps.get_model('attendees', 'Payment')
    Payment.objects.create(id=1, name='FIAT')
    Payment.objects.create(id=2, name='TOKEN')
    Payment.objects.create(id=3, name='EQUITY')


def create_product_stages(apps, schema_editor):
    ProductStage = apps.get_model('attendees', 'ProductStage')
    ProductStage.objects.create(id=1, name='PRE_PRODUCT')
    ProductStage.objects.create(id=2, name='LIVE_PRODUCT')
    ProductStage.objects.create(id=3, name='LIVE_PRODUCT_WITH_REVENUE')


def create_regions(apps, schema_editor):
    Region = apps.get_model('attendees', 'Region')
    Region.objects.create(id=1, name='ANYWHERE')
    Region.objects.create(id=2, name='ANYWHERE_EXCEPT_UNITED_STATES')
    Region.objects.create(id=3, name='SOUTH_KOREA_ONLY')
    Region.objects.create(id=4, name='OTHER')


def create_ticket_sizes(apps, schema_editor):
    TicketSize = apps.get_model('attendees', 'TicketSize')
    TicketSize.objects.create(id=1, min=0, max=5000)
    TicketSize.objects.create(id=2, min=5000, max=25000)
    TicketSize.objects.create(id=3, min=25000, max=100000)
    TicketSize.objects.create(id=4, min=100000, max=1000000)
    TicketSize.objects.create(id=5, min=1000000, max=10000000)
    TicketSize.objects.create(id=6, min=10000000, max=2147483647)


def create_token_types(apps, schema_editor):
    TokenType = apps.get_model('attendees', 'TokenType')
    TokenType.objects.create(id=1, name='PROTOCOL')
    TokenType.objects.create(id=2, name='UTILITY')
    TokenType.objects.create(id=3, name='SECURITY')


class Migration(migrations.Migration):

    replaces = [(b'attendees', '0001_initial'), (b'attendees', '0002_initial_data'), (b'attendees', '0003_token_authentication'), (b'attendees', '0004_auto_20180801_0358'), (b'attendees', '0005_auto_20180802_1004'), (b'attendees', '0006_industry_investor_project'), (b'attendees', '0007_auto_20180802_0652'), (b'attendees', '0008_auto_20180802_0417'), (b'attendees', '0009_jobrole'), (b'attendees', '0010_skill_trait'), (b'attendees', '0011_auto_20180803_0915'), (b'attendees', '0012_auto_20180806_0725'), (b'attendees', '0013_investor_region_other_text'), (b'attendees', '0014_auto_20180807_0510'), (b'attendees', '0015_auto_20180807_0937'), (b'attendees', '0016a_auto_20180808_0522'), (b'attendees', '0016b_auto_20180808_0522'), (b'attendees', '0016c_auto_20180808_0522'), (b'attendees', '0017_auto_20180808_1353'), (b'attendees', '0018_auto_20180809_0308'), (b'attendees', '0019_auto_20180809_0524'), (b'attendees', '0020_auto_20180810_0545'), (b'attendees', '0021_auto_20180815_0855'), (b'attendees', '0022_auto_20180816_0750'), (b'attendees', '0023_auto_20180816_0919'), (b'attendees', '0024_auto_20180817_0549'), (b'attendees', '0025_projectmember'), (b'attendees', '0026_auto_20180820_0625'), (b'attendees', '0027_conferenceuser_phone'), (b'attendees', '0028_auto_20180823_1520'), (b'attendees', '0029_professional_is_relocate'), (b'attendees', '0030_auto_20180824_0917'), (b'attendees', '0031_auto_20180827_0954'), (b'attendees', '0032_auto_20180829_1238'), (b'attendees', '0033_conferenceuser_image_url'), (b'attendees', '0034_auto_20180830_1805')]

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ConferenceUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone', models.CharField(default='', max_length=20, blank=True)),
                ('guid', models.CharField(max_length=16, blank=True)),
                ('first_name', models.CharField(default='', max_length=30, blank=True)),
                ('last_name', models.CharField(default='', max_length=30, blank=True)),
                ('title', models.CharField(default='', max_length=40, blank=True)),
                ('company', models.CharField(default='', max_length=40, blank=True)),
                ('twitter', models.CharField(default='', max_length=15, blank=True)),
                ('facebook', models.CharField(default='', max_length=50, blank=True)),
                ('telegram', models.CharField(default='', max_length=32, blank=True)),
                ('linkedin', models.CharField(default='', max_length=50, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='FundingStage',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Giveaway',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Investor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nationality', models.CharField(default='', max_length=2, blank=True)),
                ('region_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('email', models.EmailField(max_length=254, unique=True, null=True, db_index=True)),
                ('is_active', models.BooleanField(default=True)),
                ('funding_stages', models.ManyToManyField(to='attendees.FundingStage', blank=True)),
                ('giveaways', models.ManyToManyField(to='attendees.Giveaway', blank=True)),
                ('industries', models.ManyToManyField(to='attendees.Industry', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='JobListing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('skills_text', models.CharField(default='', max_length=100, blank=True)),
                ('link', models.URLField(default='', blank=True)),
                ('description', models.CharField(default='', max_length=250, blank=True)),
                ('part_time', models.BooleanField(default=False)),
                ('country', models.CharField(default='', max_length=2, blank=True)),
                ('city', models.CharField(default='', max_length=40, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='JobRole',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='LocalRemoteOption',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='ProductStage',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('skills_text', models.CharField(default='', max_length=100, blank=True)),
                ('traits_text', models.CharField(default='', max_length=100, blank=True)),
                ('know_most', models.CharField(default='', max_length=60, blank=True)),
                ('country', models.CharField(default='', max_length=2, blank=True)),
                ('city', models.CharField(default='', max_length=40, blank=True)),
                ('relocate', models.BooleanField(default=False)),
                ('age', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('experience', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('local_remote_options', models.ManyToManyField(to='attendees.LocalRemoteOption', blank=True)),
                ('role', models.ForeignKey(blank=True, to='attendees.JobRole', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(default='', max_length=250, blank=True)),
                ('fundraising_amount', models.PositiveIntegerField(default=0, db_index=True)),
                ('github', models.CharField(default='', max_length=140, blank=True)),
                ('image_url', models.URLField(default='', blank=True)),
                ('is_sponsor', models.BooleanField(default=False, db_index=True)),
                ('legal_country', models.CharField(max_length=2, db_index=True)),
                ('main_country', models.CharField(max_length=2, db_index=True)),
                ('name', models.CharField(max_length=40)),
                ('news', models.URLField(default='', blank=True)),
                ('notable', models.CharField(default='', max_length=250, blank=True)),
                ('region_other_text', models.CharField(default='', max_length=40, blank=True)),
                ('services_consumed_other_text', models.CharField(default='', max_length=100, blank=True)),
                ('services_provided_other_text', models.CharField(default='', max_length=100, blank=True)),
                ('size', models.PositiveIntegerField(default=0)),
                ('tagline', models.CharField(default='', max_length=60, blank=True)),
                ('telegram', models.CharField(default='', max_length=32, blank=True)),
                ('twitter', models.CharField(default='', max_length=15, blank=True)),
                ('website', models.URLField(default='', blank=True)),
                ('whitepaper', models.URLField(default='', blank=True)),
                ('funding_stage', models.ForeignKey(blank=True, to='attendees.FundingStage', null=True)),
                ('giveaway', models.ForeignKey(blank=True, to='attendees.Giveaway', null=True)),
                ('industry', models.ForeignKey(to='attendees.Industry')),
                ('product_stage', models.ForeignKey(blank=True, to='attendees.ProductStage', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectMember',
            fields=[
                ('email', models.EmailField(max_length=254, serialize=False, primary_key=True)),
                ('project', models.ForeignKey(to='attendees.Project')),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='TicketSize',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('min', models.PositiveIntegerField()),
                ('max', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TokenType',
            fields=[
                ('id', models.IntegerField(serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='region',
            field=models.ForeignKey(blank=True, to='attendees.Region', null=True),
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
        migrations.AddField(
            model_name='project',
            name='token_type',
            field=models.ForeignKey(blank=True, to='attendees.TokenType', null=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='local_remote_options',
            field=models.ManyToManyField(to='attendees.LocalRemoteOption'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='payments',
            field=models.ManyToManyField(to='attendees.Payment', blank=True),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='project',
            field=models.ForeignKey(related_name='job_listings', to='attendees.Project'),
        ),
        migrations.AddField(
            model_name='joblisting',
            name='role',
            field=models.ForeignKey(to='attendees.JobRole'),
        ),
        migrations.AddField(
            model_name='investor',
            name='product_stages',
            field=models.ManyToManyField(to='attendees.ProductStage', blank=True),
        ),
        migrations.AddField(
            model_name='investor',
            name='region',
            field=models.ForeignKey(default='', blank=True, to='attendees.Region', null=True),
        ),
        migrations.AddField(
            model_name='investor',
            name='ticket_sizes',
            field=models.ManyToManyField(to='attendees.TicketSize', blank=True),
        ),
        migrations.AddField(
            model_name='investor',
            name='token_types',
            field=models.ManyToManyField(to='attendees.TokenType', blank=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='investor',
            field=models.OneToOneField(related_name='conference_user', null=True, on_delete=django.db.models.deletion.SET_NULL, blank=True, to='attendees.Investor'),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='professional',
            field=models.OneToOneField(related_name='user', null=True, on_delete=django.db.models.deletion.SET_NULL, blank=True, to='attendees.Professional'),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='project',
            field=models.ForeignKey(related_name='members', blank=True, to='attendees.Project', null=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='project_request',
            field=models.ForeignKey(related_name='member_requests', blank=True, to='attendees.Project', null=True),
        ),
        migrations.AddField(
            model_name='conferenceuser',
            name='user',
            field=models.OneToOneField(related_name='conference_user', null=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.RunPython(create_funding_stages),
        migrations.RunPython(create_giveaways),
        migrations.RunPython(create_industries),
        migrations.RunPython(create_job_roles),
        migrations.RunPython(create_local_remote_options),
        migrations.RunPython(create_payments),
        migrations.RunPython(create_product_stages),
        migrations.RunPython(create_regions),
        migrations.RunPython(create_ticket_sizes),
        migrations.RunPython(create_token_types),
    ]
