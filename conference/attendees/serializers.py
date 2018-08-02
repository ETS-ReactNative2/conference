from rest_framework import serializers
from . import models


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Investor
        fields = (
            'id',
            'funding_stages',
            'giveaways',
            'industries',
            'product_stages',
            'ticket_sizes',
            'token_types',
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = (
            'id',
            'description',
            'funding_stage',
            'fundraising_amount',
            'github',
            'giveaway',
            'name',
            'news',
            'notable',
            'product_stage',
            'tagline',
            'telegram',
            'token_type',
            'twitter',
            'website',
            'whitepaper',
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
        )
