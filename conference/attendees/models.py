# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

COMPANY_MAX_LENGTH = 40

CITY_MAX_LENGTH = 40

COUNTRY_MAX_LENGTH = 2

FIRST_NAME_MAX_LENGTH = 30

LAST_NAME_MAX_LENGTH = 30

REGION_OTHER_TEXT_MAX_LENGTH = 40

SKILLS_MAX_LENGTH = 100

TRAITS_MAX_LENGTH = 100

URL_MAX_LENGTH = 200


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_conference_user(sender, instance=None, created=False, **kwargs):
    if created:
        # Check if there is an Investor for the email address
        investor_queryset = Investor.objects.filter(email=instance.email)
        if investor_queryset.exists():
            investor = investor_queryset.get()
            # Check if there is a ConferenceUser for the Investor
            conference_user_queryset = ConferenceUser.objects.filter(investor=investor)
            if conference_user_queryset.exists():
                conference_user = conference_user_queryset.get()
                conference_user.user = instance
                conference_user.save()
            else:
                ConferenceUser.objects.create(user=instance, investor=investor)
        else:
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


class Service(models.Model):

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


class Project(models.Model):
    """
    A company potentially raising funds.
    """

    DESCRIPTION_MAX_LENGTH = 250

    # 39 characters user/organization + slash + 100 characters repo
    GITHUB_MAX_LENGTH = 140

    NAME_MAX_LENGTH = 40

    NOTABLE_MAX_LENGTH = 250

    SERVICES_CONSUMED_OTHER_TEXT_MAX_LENGTH = 100

    SERVICES_PROVIDED_OTHER_TEXT_MAX_LENGTH = 100

    TAGLINE_MAX_LENGTH = 60

    TELEGRAM_MAX_LENGTH = 32

    TWITTER_MAX_LENGTH = 15

    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH, blank=True, default='')

    funding_stage = models.ForeignKey(FundingStage, db_index=True, null=True, blank=True)

    fundraising_amount = models.PositiveIntegerField(db_index=True, default=0)

    github = models.CharField(max_length=GITHUB_MAX_LENGTH, blank=True, default='')

    giveaway = models.ForeignKey(Giveaway, db_index=True, null=True, blank=True)

    image_url = models.URLField(blank=True, default='')

    industry = models.ForeignKey(Industry, db_index=True)

    is_sponsor = models.BooleanField(db_index=True, default=False)

    legal_country = models.CharField(db_index=True, max_length=COUNTRY_MAX_LENGTH)

    main_country = models.CharField(db_index=True, max_length=COUNTRY_MAX_LENGTH)

    name = models.CharField(max_length=NAME_MAX_LENGTH)

    news = models.URLField(blank=True, default='')

    notable = models.CharField(max_length=NOTABLE_MAX_LENGTH, blank=True, default='')

    product_stage = models.ForeignKey(ProductStage, db_index=True, null=True, blank=True)

    # Desired Investor's Region
    region = models.ForeignKey(Region, null=True, blank=True)

    # Desired Investor's Region Other Text
    region_other_text = models.CharField(max_length=REGION_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    services_consumed = models.ManyToManyField(Service, blank=True, related_name='projects_consuming')

    services_consumed_other_text = models.CharField(max_length=SERVICES_CONSUMED_OTHER_TEXT_MAX_LENGTH, blank=True,
                                                    default='')

    services_provided = models.ManyToManyField(Service, blank=True, related_name='projects_providing')

    services_provided_other_text = models.CharField(max_length=SERVICES_PROVIDED_OTHER_TEXT_MAX_LENGTH, blank=True,
                                                    default='')

    size = models.PositiveIntegerField(default=0)

    tagline = models.CharField(max_length=TAGLINE_MAX_LENGTH, blank=True, default='')

    telegram = models.CharField(max_length=TELEGRAM_MAX_LENGTH, default='', blank=True)

    token_type = models.ForeignKey(TokenType, db_index=True, null=True, blank=True)

    twitter = models.CharField(max_length=TWITTER_MAX_LENGTH, blank=True, default='')

    website = models.URLField(blank=True, default='')

    whitepaper = models.URLField(blank=True, default='')


class ProjectMember(models.Model):

    email = models.EmailField(primary_key=True)

    project = models.ForeignKey(Project)


class Investor(models.Model):
    """
    A company doing investing.
    """

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

    # For Investor sign-ups through the website form, before the investor has signed up in the app
    email = models.EmailField(null=True, unique=True, db_index=True)

    is_active = models.BooleanField(default=True)


class Professional(models.Model):

    KNOW_MOST_MAX_LENGTH = 60

    role = models.ForeignKey(JobRole, db_index=True, null=True, blank=True)

    role_other_text = models.CharField(max_length=JobRole.ROLE_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    skills_text = models.CharField(max_length=SKILLS_MAX_LENGTH, blank=True, default='')

    traits_text = models.CharField(max_length=TRAITS_MAX_LENGTH, blank=True, default='')

    know_most = models.CharField(max_length=KNOW_MOST_MAX_LENGTH, blank=True, default='')

    local_remote_options = models.ManyToManyField(LocalRemoteOption, blank=True)

    country = models.CharField(max_length=COUNTRY_MAX_LENGTH, blank=True, default='')

    city = models.CharField(max_length=CITY_MAX_LENGTH, blank=True, default='')

    relocate = models.BooleanField(default=False)

    age = models.PositiveSmallIntegerField(null=True, blank=True)

    experience = models.PositiveSmallIntegerField(null=True, blank=True)

    is_active = models.BooleanField(default=True)


class ConferenceUser(models.Model):
    """
    Extra information about a user that's not related to the authentication process.
    """

    PHONE_MAX_LENGTH = 20

    GUID_MAX_LENGTH = 16

    TITLE_MAX_LENGTH = 40

    TWITTER_MAX_LENGTH = 15

    FACEBOOK_MAX_LENGTH = 50

    TELEGRAM_MAX_LENGTH = 32

    LINKEDIN_MAX_LENGTH = 100

    user = models.OneToOneField(User, null=True, related_name='conference_user', on_delete=models.CASCADE)

    phone = models.CharField(max_length=PHONE_MAX_LENGTH, blank=True, default='')

    guid = models.CharField(max_length=GUID_MAX_LENGTH, blank=True)

    first_name = models.CharField(max_length=FIRST_NAME_MAX_LENGTH, blank=True, default='')

    last_name = models.CharField(max_length=LAST_NAME_MAX_LENGTH, blank=True, default='')

    title = models.CharField(max_length=TITLE_MAX_LENGTH, blank=True, default='')

    company = models.CharField(max_length=COMPANY_MAX_LENGTH, blank=True, default='')

    twitter = models.CharField(max_length=TWITTER_MAX_LENGTH, blank=True, default='')

    facebook = models.CharField(max_length=FACEBOOK_MAX_LENGTH, blank=True, default='')

    telegram = models.CharField(max_length=TELEGRAM_MAX_LENGTH, blank=True, default='')

    linkedin = models.CharField(max_length=LINKEDIN_MAX_LENGTH, blank=True, default='')

    professional = models.OneToOneField(
        Professional, related_name='user', null=True, blank=True, on_delete=models.SET_NULL
    )

    investor = models.OneToOneField(Investor, related_name='conference_user', db_index=True, null=True, blank=True,
                                    on_delete=models.SET_NULL)

    project = models.ForeignKey(Project, related_name='members', db_index=True, null=True, blank=True)

    project_request = models.ForeignKey(Project, related_name='member_requests', db_index=True, null=True, blank=True)


class JobListing(models.Model):

    DESCRIPTION_MAX_LENGTH = 250

    role = models.ForeignKey(JobRole, db_index=True)

    role_other_text = models.CharField(max_length=JobRole.ROLE_OTHER_TEXT_MAX_LENGTH, blank=True, default='')

    skills_text = models.CharField(max_length=SKILLS_MAX_LENGTH, blank=True, default='')

    link = models.URLField(blank=True, default='')

    description = models.CharField(max_length=DESCRIPTION_MAX_LENGTH, blank=True, default='')

    part_time = models.BooleanField(default=False)

    payments = models.ManyToManyField(Payment, blank=True)

    local_remote_options = models.ManyToManyField(LocalRemoteOption)

    country = models.CharField(max_length=COUNTRY_MAX_LENGTH, blank=True, default='')

    city = models.CharField(max_length=CITY_MAX_LENGTH, blank=True, default='')

    project = models.ForeignKey(Project, related_name='job_listings')
