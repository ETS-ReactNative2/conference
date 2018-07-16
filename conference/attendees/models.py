# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class Link(models.Model):
    """
    Link to social media.
    """

    url = models.URLField()


class ConferenceUser(models.Model):
    """
    Extra information about a user that's not related to the authentication process.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Company(models.Model):
    """
    Abstract superclass of Project and Investor.
    """

    FUNDING_STAGE_SEED = 1
    FUNDING_STAGE_PRE_ICO = 2
    FUNDING_STAGE_POST_ICO = 3
    FUNDING_STAGES = (
        (FUNDING_STAGE_SEED, 'FUNDING_STAGE_SEED'),
        (FUNDING_STAGE_PRE_ICO, 'FUNDING_STAGE_PRE_ICO'),
        (FUNDING_STAGE_POST_ICO, 'FUNDING_STAGE_POST_ICO'),
    )
    GIVEAWAY_TOKEN = 1
    GIVEAWAY_EQUITY = 2
    GIVEAWAY_BOTH = 3
    GIVEAWAYS = (
        (GIVEAWAY_TOKEN, 'GIVEAWAY_TOKEN'),
        (GIVEAWAY_EQUITY, 'GIVEAWAY_EQUITY'),
        (GIVEAWAY_BOTH, 'GIVEAWAY_BOTH'),
    )
    PRODUCT_STAGE_PRE_PRODUCT = 1
    PRODUCT_STAGE_LIVE_PRODUCT = 2
    PRODUCT_STAGE_LIVE_PRODUCT_WITH_REVENUE = 3
    PRODUCT_STAGES = (
        (PRODUCT_STAGE_PRE_PRODUCT, 'PRODUCT_STAGE_PRE_PRODUCT'),
        (PRODUCT_STAGE_LIVE_PRODUCT, 'PRODUCT_STAGE_LIVE_PRODUCT'),
        (PRODUCT_STAGE_LIVE_PRODUCT_WITH_REVENUE, 'PRODUCT_STAGE_LIVE_PRODUCT_WITH_REVENUE'),
    )
    TOKEN_TYPE_PROTOCOL = 1
    TOKEN_TYPE_UTILITY = 2
    TOKEN_TYPE_SECURITY = 3
    TOKEN_TYPES = (
        (TOKEN_TYPE_PROTOCOL, 'TOKEN_TYPE_PROTOCOL'),
        (TOKEN_TYPE_UTILITY, 'TOKEN_TYPE_UTILITY'),
        (TOKEN_TYPE_SECURITY, 'TOKEN_TYPE_SECURITY'),
    )

    country = models.CharField(max_length=3, blank=True, default='')

    description = models.TextField(blank=True, default='')

    links = models.ManyToManyField(Link)

    name = models.CharField(max_length=255, blank=True, default='')

    tagline = models.CharField(max_length=255, blank=True, default='')


class Project(Company):
    """
    A company potentially raising funds.
    """

    funding_stage = models.PositiveSmallIntegerField(choices=Company.FUNDING_STAGES, null=True, blank=True)

    fundraising_amount = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    giveaway = models.PositiveSmallIntegerField(choices=Company.GIVEAWAYS, null=True, blank=True)

    notable = models.TextField(blank=True, default='')

    product_stage = models.PositiveSmallIntegerField(choices=Company.PRODUCT_STAGES, null=True, blank=True)

    token_type = models.PositiveSmallIntegerField(choices=Company.TOKEN_TYPES, null=True, blank=True)


class Investor(Company):
    """
    A company doing investing.
    """

    max_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    min_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)


class InvestorFundingStage(models.Model):

    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)

    funding_stage = models.PositiveSmallIntegerField(choices=Company.FUNDING_STAGES)


class InvestorProductStage(models.Model):

    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)

    product_stage = models.PositiveSmallIntegerField(choices=Company.PRODUCT_STAGES)


class InvestorTokenType(models.Model):

    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)

    token_type = models.PositiveSmallIntegerField(choices=Company.TOKEN_TYPES)
