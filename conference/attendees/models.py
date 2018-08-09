# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

CITY_MAX_LENGTH = 40

COUNTRY_MAX_LENGTH = 2

URL_MAX_LENGTH = 200


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_conference_user(sender, instance=None, created=False, **kwargs):
    if created:
        ConferenceUser.objects.create(user=instance)


class FundingStage(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Giveaway(models.Model):

    # BOTH is a special value which only projects can use.
    BOTH = 3

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Industry(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class ProductStage(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Region(models.Model):

    ANYWHERE = 1

    ANYWHERE_EXCEPT_UNITED_STATES = 2

    SOUTH_KOREA_ONLY = 3

    OTHER = 4

    COUNTRY_SOUTH_KOREA = 'KR'

    COUNTRY_UNITED_STATES = 'US'

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class TicketSize(models.Model):

    POSITIVE_INFINITY = 2147483647

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    min = models.PositiveIntegerField()

    max = models.PositiveIntegerField()

    def __str__(self):
        return '{} <= x < {}'.format(min, max)


class TokenType(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class LocalRemoteOption(models.Model):

    LOCAL = 1

    REMOTE = 2

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class JobRole(models.Model):

    OTHER = 12

    ROLE_OTHER_TEXT_MAX_LENGTH = 40

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Payment(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Skill(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=56)

    def __str__(self):
        return self.name


class Trait(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=24)

    def __str__(self):
        return self.name


class Project(models.Model):
    """
    A company potentially raising funds.
    """

    DESCRIPTION_MAX_LENGTH = 250

    # 39 characters user/organization + slash + 100 characters repo
    GITHUB_MAX_LENGTH = 140

    NAME_MAX_LENGTH = 40

    NOTABLE_MAX_LENGTH = 250

    TAGLINE_MAX_LENGTH = 60

    TELEGRAM_MAX_LENGTH = 32

    TWITTER_MAX_LENGTH = 15

    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH, blank=True, default='')

    funding_stage = models.ForeignKey(FundingStage, db_index=True, null=True, blank=True)

    fundraising_amount = models.PositiveIntegerField(db_index=True, default=0)

    github = models.CharField(max_length=GITHUB_MAX_LENGTH, blank=True, default='')

    giveaway = models.ForeignKey(Giveaway, db_index=True, null=True, blank=True)

    industry = models.ForeignKey(Industry, db_index=True)

    legal_country = models.CharField(db_index=True, max_length=COUNTRY_MAX_LENGTH)

    main_country = models.CharField(db_index=True, max_length=COUNTRY_MAX_LENGTH)

    name = models.CharField(max_length=NAME_MAX_LENGTH)

    news = models.URLField(blank=True, default='')

    notable = models.CharField(max_length=NOTABLE_MAX_LENGTH, blank=True, default='')

    product_stage = models.ForeignKey(ProductStage, db_index=True, null=True, blank=True)

    size = models.PositiveIntegerField()

    tagline = models.CharField(max_length=TAGLINE_MAX_LENGTH, blank=True, default='')

    telegram = models.CharField(max_length=TELEGRAM_MAX_LENGTH, default='', blank=True)

    token_type = models.ForeignKey(TokenType, db_index=True, null=True, blank=True)

    twitter = models.CharField(max_length=TWITTER_MAX_LENGTH, blank=True, default='')

    website = models.URLField(blank=True, default='')

    whitepaper = models.URLField(blank=True, default='')


class Investor(models.Model):
    """
    A company doing investing.
    """

    REGION_OTHER_TEXT_MAX_LENGTH = 40

    funding_stages = models.ManyToManyField(FundingStage, blank=True)

    giveaways = models.ManyToManyField(Giveaway, blank=True)

    industries = models.ManyToManyField(Industry, blank=True)

    # The investor's own nationality.
    nationality = models.CharField(max_length=COUNTRY_MAX_LENGTH, blank=True, default='')

    product_stages = models.ManyToManyField(ProductStage, blank=True)

    # The desired region of projects.
    region = models.ForeignKey(Region, null=True, blank=True, default='')

    region_other_text = models.CharField(max_length=REGION_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    ticket_sizes = models.ManyToManyField(TicketSize, blank=True)

    token_types = models.ManyToManyField(TokenType, blank=True)


class Professional(models.Model):

    KNOW_MOST_MAX_LENGTH = 60

    role = models.ForeignKey(JobRole, db_index=True, null=True, blank=True)

    role_other_text = models.CharField(max_length=JobRole.ROLE_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    skills = models.ManyToManyField(Skill, blank=True)

    traits = models.ManyToManyField(Trait, blank=True)

    know_most = models.CharField(max_length=KNOW_MOST_MAX_LENGTH, blank=True, default='')

    local_remote_options = models.ManyToManyField(LocalRemoteOption, blank=True)

    country = models.CharField(max_length=COUNTRY_MAX_LENGTH, blank=True, default='')

    city = models.CharField(max_length=CITY_MAX_LENGTH, blank=True, default='')

    age = models.PositiveSmallIntegerField(null=True, blank=True)

    experience = models.PositiveSmallIntegerField(null=True, blank=True)


class ConferenceUser(models.Model):
    """
    Extra information about a user that's not related to the authentication process.
    """

    FIRST_NAME_MAX_LENGTH = 30

    LAST_NAME_MAX_LENGTH = 30

    TITLE_MAX_LENGTH = 40

    COMPANY_MAX_LENGTH = 40

    TWITTER_MAX_LENGTH = 15

    FACEBOOK_MAX_LENGTH = 50

    TELEGRAM_MAX_LENGTH = 32

    LINKEDIN_MAX_LENGTH = 50

    user = models.OneToOneField(User, related_name='conference_user', on_delete=models.CASCADE)

    title = models.CharField(max_length=TITLE_MAX_LENGTH, blank=True, default='')

    company = models.CharField(max_length=COMPANY_MAX_LENGTH, blank=True, default='')

    twitter = models.CharField(max_length=TWITTER_MAX_LENGTH, blank=True, default='')

    facebook = models.CharField(max_length=FACEBOOK_MAX_LENGTH, blank=True, default='')

    telegram = models.CharField(max_length=TELEGRAM_MAX_LENGTH, blank=True, default='')

    linkedin = models.CharField(max_length=LINKEDIN_MAX_LENGTH, blank=True, default='')

    professional = models.OneToOneField(
        Professional, related_name='user', null=True, blank=True, on_delete=models.SET_NULL
    )

    investor = models.ForeignKey(Investor, related_name='users', db_index=True, null=True, blank=True)

    project = models.ForeignKey(Project, related_name='users', db_index=True, null=True, blank=True)


class JobListing(models.Model):

    DESCRIPTION_MAX_LENGTH = 250

    role = models.ForeignKey(JobRole, db_index=True)

    role_other_text = models.CharField(max_length=JobRole.ROLE_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    skills = models.ManyToManyField(Skill, blank=True)

    link = models.URLField(blank=True, default='')

    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH, blank=True, default='')

    part_time = models.BooleanField(default=False)

    payments = models.ManyToManyField(Payment, blank=True)

    local_remote_options = models.ManyToManyField(LocalRemoteOption)

    country = models.CharField(max_length=COUNTRY_MAX_LENGTH, blank=True, default='')

    city = models.CharField(max_length=CITY_MAX_LENGTH, blank=True, default='')

    project = models.ForeignKey(Project, related_name='job_listings')
