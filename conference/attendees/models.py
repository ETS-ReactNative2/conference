# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class FundingStage(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Giveaway(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class ProductStage(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class TokenType(models.Model):

    id = models.IntegerField(primary_key=True, verbose_name='ID')

    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class ConferenceUser(models.Model):
    """
    Extra information about a user that's not related to the authentication process.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Company(models.Model):
    """
    Abstract superclass of Project and Investor.
    """

    country = models.CharField(max_length=3, blank=True, default='')

    description = models.TextField(blank=True, default='')

    name = models.CharField(max_length=255, blank=True, default='')

    tagline = models.CharField(max_length=255, blank=True, default='')


class Project(Company):
    """
    A company potentially raising funds.
    """

    funding_stage = models.ForeignKey(FundingStage, db_index=True, null=True, blank=True)

    fundraising_amount = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    giveaway = models.ForeignKey(Giveaway, db_index=True, null=True, blank=True)

    notable = models.TextField(blank=True, default='')

    product_stage = models.ForeignKey(ProductStage, db_index=True, null=True, blank=True)

    token_type = models.ForeignKey(TokenType, db_index=True, null=True, blank=True)


class Investor(Company):
    """
    A company doing investing.
    """

    funding_stages = models.ManyToManyField(FundingStage, blank=True)

    giveaways = models.ManyToManyField(Giveaway, blank=True)

    max_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    min_ticket = models.DecimalField(db_index=True, max_digits=12, decimal_places=0, null=True, blank=True)

    product_stages = models.ManyToManyField(ProductStage, blank=True)

    token_types = models.ManyToManyField(TokenType, blank=True)
