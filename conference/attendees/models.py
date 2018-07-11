# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class FundingStage(models.Model):
    """
    Seed
    Pre-ICO
    Post-ICO
    """

    name = models.CharField(max_length=30)


class Giveaway(models.Model):
    """
    Token
    Equity
    Both
    """

    name = models.CharField(max_length=30)


class Link(models.Model):
    """
    Link to social media.
    """

    url = models.URLField()


class ProductStage(models.Model):
    """
    Pre-Product
    Live Product
    Live Product With Revenue
    """

    name = models.CharField(max_length=30)


class Region(models.Model):
    """
    South Korea
    United States of America
    Other
    """

    name = models.CharField(max_length=30)


class TokenType(models.Model):
    """
    Protocol
    Utility
    Security
    """

    name = models.CharField(max_length=30)


class Attendee(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    links = models.ManyToManyField(Link)

    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Company(models.Model):
    """
    Abstract superclass of Project and Investor.
    """

    description = models.TextField(null=True, blank=True)

    links = models.ManyToManyField(Link)

    name = models.CharField(max_length=255, null=True, blank=True)

    region = models.ForeignKey(Region, null=True, blank=True)

    tagline = models.CharField(max_length=255, null=True, blank=True)


class Project(Company):
    """
    A company potentially raising funds.
    """

    funding_stage = models.ForeignKey(FundingStage, null=True, blank=True, on_delete=models.SET_NULL)

    fundraising_amount = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    giveaway = models.ForeignKey(Giveaway, null=True, blank=True, on_delete=models.SET_NULL)

    notable_team_members = models.TextField(null=True, blank=True)

    product_stage = models.ForeignKey(ProductStage, null=True, blank=True, on_delete=models.SET_NULL)

    token_type = models.ForeignKey(TokenType, null=True, blank=True, on_delete=models.SET_NULL)


class Investor(Company):
    """
    A company doing investing.
    """

    funding_stages = models.ManyToManyField(FundingStage)

    max_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    min_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    product_stages = models.ManyToManyField(ProductStage)

    regions = models.ManyToManyField(Region)

    token_types = models.ManyToManyField(TokenType)
