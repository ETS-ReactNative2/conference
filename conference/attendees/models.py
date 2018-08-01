# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


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

    product_stages = models.ManyToManyField(ProductStage, blank=True)

    ticket_sizes = models.ManyToManyField(TicketSize, blank=True)

    token_types = models.ManyToManyField(TokenType, blank=True)
