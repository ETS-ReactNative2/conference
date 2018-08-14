from django.db import transaction
from rest_framework import serializers
from . import models


class ConferenceUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=models.ConferenceUser.FIRST_NAME_MAX_LENGTH, source='user.first_name')
    last_name = serializers.CharField(max_length=models.ConferenceUser.LAST_NAME_MAX_LENGTH, source='user.last_name')

    class Meta:
        model = models.ConferenceUser
        fields = (
            'user',
            'first_name',
            'last_name',
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
            'region_other_text',
            'ticket_sizes',
            'token_types',
        )

    @transaction.atomic
    def create(self, validated_data):
        funding_stages = validated_data.pop('funding_stages')
        giveaways = validated_data.pop('giveaways')
        industries = validated_data.pop('industries')
        product_stages = validated_data.pop('product_stages')
        ticket_sizes = validated_data.pop('ticket_sizes')
        token_types = validated_data.pop('token_types')
        if not validated_data.get('region'):
            validated_data['region'] = models.Region.objects.get(pk=models.Region.ANYWHERE)
        instance = models.Investor.objects.create(**validated_data)
        if not funding_stages:
            funding_stages = models.FundingStage.objects.all()
        if not giveaways:
            giveaways = models.Giveaway.objects.exclude(pk=models.Giveaway.BOTH)
        if not industries:
            industries = models.Industry.objects.all()
        if not product_stages:
            product_stages = models.ProductStage.objects.all()
        if not ticket_sizes:
            ticket_sizes = models.TicketSize.objects.all()
        if not token_types:
            token_types = models.TokenType.objects.all()
        instance.funding_stages = funding_stages
        instance.giveaways = giveaways
        instance.industries = industries
        instance.product_stages = product_stages
        instance.ticket_sizes = ticket_sizes
        instance.token_types = token_types
        instance.save()
        return instance


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
        )


class ProfessionalSerializer(serializers.ModelSerializer):
    user = ConferenceUserSerializer()
    class Meta:
        model = models.Professional
        fields = (
            'role',
            'role_other_text',
            'skills',
            'traits',
            'know_most',
            'local_remote_options',
            'country',
            'city',
            'age',
            'experience',
            'user',
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
            'industry',
            'legal_country',
            'main_country',
            'name',
            'news',
            'notable',
            'product_stage',
            'size',
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
