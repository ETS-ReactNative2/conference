from rest_framework import serializers
from . import models


class ConferenceUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ConferenceUser
        fields = (
            'user',
            'title',
            'company',
            'twitter',
            'facebook',
            'telegram',
            'linkedin',
        )


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Investor
        fields = (
            'id',
            'funding_stages',
            'giveaways',
            'industries',
            'nationality',
            'product_stages',
            'region',
            'ticket_sizes',
            'token_types',
        )


class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.JobListing
        fields = (
            'id',
            'role',
            'role_other_text',
            'skills',
            'link',
            'description',
            'part_time',
            'payments',
            'local_remote_options',
            'country',
            'city',
            'project',
        )


class ProjectSerializer(serializers.ModelSerializer):
    job_listings = JobListingSerializer(many=True, read_only=True)

    class Meta:
        model = models.Project
        fields = (
            'id',
            'description',
            'funding_stage',
            'fundraising_amount',
            'github',
            'giveaway',
            'legal_country',
            'main_country',
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
            'job_listings',
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            'id',
            'email',
        )
