from rest_framework import serializers
from . import models


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Investor
        fields = (
            'id',
            'country',
            'description',
            'funding_stages',
            'giveaways',
            'max_ticket',
            'min_ticket',
            'name',
            'product_stages',
            'tagline',
            'token_types',
        )


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = (
            'id',
            'country',
            'description',
            'funding_stage',
            'giveaway',
            'name',
            'notable',
            'product_stage',
            'tagline',
            'token_type',
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
