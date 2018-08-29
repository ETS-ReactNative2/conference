# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.core.mail import EmailMessage
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.utils.html import escape, strip_tags
from rest_framework import status
from rest_framework.views import APIView
from . import models
from . import serializers


class ListInvestor(generics.ListAPIView):
    serializer_class = serializers.InvestorSerializer

    def get_queryset(self):
        filters = {
            'is_active': True,
        }
        excludes = {}
        if self.request.GET.get('defaults') == 'true':
            project = self.request.user.conference_user.project
            if project:
                if project.funding_stage:
                    filters['funding_stages__in'] = [project.funding_stage.pk]
                if project.giveaway and project.giveaway.pk != models.Giveaway.BOTH:
                    filters['giveaways__in'] = [project.giveaway.pk]
                if project.product_stage:
                    filters['product_stages__in'] = [project.product_stage.pk]
                if project.region and project.region.pk == models.Region.ANYWHERE_EXCEPT_UNITED_STATES:
                    excludes['nationality'] = models.Region.COUNTRY_UNITED_STATES
                elif project.region and project.region.pk == models.Region.SOUTH_KOREA_ONLY:
                    filters['nationality'] = models.Region.COUNTRY_SOUTH_KOREA
                if project.token_type:
                    filters['token_types__in'] = [project.token_type.pk]
        else:
            funding_stages = self.request.GET.getlist('funding_stage')
            if funding_stages:
                filters['funding_stages__in'] = funding_stages
            giveaways = self.request.GET.getlist('giveaway')
            if giveaways:
                filters['giveaways__in'] = giveaways
            product_stages = self.request.GET.getlist('product_stage')
            if product_stages:
                filters['product_stages__in'] = product_stages
            region = self.request.GET.get('region')
            clean_region = int(region) if region else None
            if clean_region == models.Region.ANYWHERE_EXCEPT_UNITED_STATES:
                excludes['nationality'] = models.Region.COUNTRY_UNITED_STATES
            elif clean_region == models.Region.SOUTH_KOREA_ONLY:
                filters['nationality'] = models.Region.COUNTRY_SOUTH_KOREA
            ticket_sizes = self.request.GET.getlist('ticket_size')
            if ticket_sizes:
                filters['ticket_sizes__in'] = ticket_sizes
            token_types = self.request.GET.getlist('token_type')
            if token_types:
                filters['token_types__in'] = token_types
        return models.Investor.objects.filter(**filters).exclude(**excludes).distinct()


class InvestorsDefaults(APIView):

    def get(self, request, format=None):
        result = {}
        project = request.user.conference_user.project
        if not project:
            result['funding_stage'] = []
            result['giveaway'] = []
            result['product_stage'] = []
            result['region'] = models.Region.ANYWHERE
            result['token_type'] = []
            result['industry'] = []
        else:
            result['funding_stage'] = [project.funding_stage.pk] if project.funding_stage else []
            if project.giveaway:
                if project.giveaway.pk == models.Giveaway.BOTH:
                    result['giveaway'] = [1, 2]
                else:
                    result['giveaway'] = [project.giveaway.pk]
            else:
                result['giveaway'] = []
            result['product_stage'] = [project.product_stage.pk] if project.product_stage else []
            result['region'] = models.Region.ANYWHERE
            result['token_type'] = [project.token_type.pk] if project.token_type else []
            result['industry'] = [project.industry.pk] if project.industry else []
        return JsonResponse(result)


class RetrieveInvestor(generics.RetrieveAPIView):
    queryset = models.Investor.objects.all()
    serializer_class = serializers.InvestorSerializer


class InvestorsIdMessages(APIView):

    @transaction.atomic
    def post(self, request, pk, format=None):

        project = request.user.conference_user.project
        if not project:
            return JsonResponse({'code': 'user_not_in_project'}, status=status.HTTP_403_FORBIDDEN)

        queryset = models.Investor.objects.filter(pk=pk)
        if not queryset.exists():
            return JsonResponse({'code': 'no_such_investor'}, status=status.HTTP_404_NOT_FOUND)

        investor = queryset.get()
        investor_user = investor.conference_user.user

        json_body = request.data
        message = json_body.get('message')
        if not message:
            return JsonResponse({'code': 'no_message'}, status=status.HTTP_400_BAD_REQUEST)
        clean_message = escape(strip_tags(message))

        body = """Dear {},

you have received the following message from a verified Block Seoul conference attendee. You can reach this attendee by replying directly to this email.

Best regards,
Luna

Name: {} {}

Project: {}

Message:

{}""".format(investor_user.first_name, request.user.first_name, request.user.last_name, project.name, clean_message)

        email = EmailMessage(
            'Block Seoul project message',
            body,
            'noreply@meetluna.com',
            [investor_user.email],
            reply_to=[request.user.email],
        )
        email.send()
        return HttpResponse(status=status.HTTP_201_CREATED)


class MyInvestor(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has an investor
        if not request.user.conference_user.investor:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        return JsonResponse(serializers.InvestorSerializer(request.user.conference_user.investor).data,
                            status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, format=None):
        json_body = request.data

        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)
        if request.user.conference_user.investor:
            investor = request.user.conference_user.investor
        else:
            investor = models.Investor.objects.create()

        funding_stages = json_body.get('funding_stages')
        clean_funding_stages = [models.FundingStage.objects.get(pk=pk) for pk in funding_stages] if (
            funding_stages
        ) else models.FundingStage.objects.all()

        giveaways = json_body.get('giveaways')
        clean_giveaways = [models.Giveaway.objects.get(pk=pk) for pk in giveaways] if (
            giveaways
        ) else [models.Giveaway.objects.get(pk=pk) for pk in [1, 2]]

        industries = json_body.get('industries')
        clean_industries = [models.Industry.objects.get(pk=pk) for pk in industries] if (
            industries
        ) else models.Industry.objects.all()

        nationality = json_body.get('nationality')
        clean_nationality = nationality[:models.COUNTRY_MAX_LENGTH].upper() if nationality else ''

        product_stages = json_body.get('product_stages')
        clean_product_stages = [models.ProductStage.objects.get(pk=pk) for pk in product_stages] if (
            product_stages
        ) else models.ProductStage.objects.all()

        region = json_body.get('region')
        clean_region = models.Region.objects.get(pk=region) if (
                region and 1 <= region <= 4
        ) else models.Region.objects.get(pk=models.Region.ANYWHERE)

        region_other_text = json_body.get('region_other_text')
        clean_region_other_text = region_other_text[:models.REGION_OTHER_TEXT_MAX_LENGTH] if (
                region_other_text and clean_region.pk == models.Region.OTHER
        ) else ''

        ticket_sizes = json_body.get('ticket_sizes')
        clean_ticket_sizes = [models.TicketSize.objects.get(pk=pk) for pk in ticket_sizes] if (
            ticket_sizes
        ) else models.TicketSize.objects.all()

        token_types = json_body.get('token_types')
        clean_token_types = [models.TokenType.objects.get(pk=pk) for pk in token_types] if (
            token_types
        ) else models.TokenType.objects.all()

        investor.funding_stages = clean_funding_stages
        investor.giveaways = clean_giveaways
        investor.industries = clean_industries
        investor.nationality = clean_nationality
        investor.product_stages = clean_product_stages
        investor.region = clean_region
        investor.region_other_text = clean_region_other_text
        investor.ticket_sizes = clean_ticket_sizes
        investor.token_types = clean_token_types
        investor.is_active = True
        investor.save()
        request.user.conference_user.investor = investor
        request.user.conference_user.save()
        return JsonResponse(serializers.InvestorSerializer(investor).data, status=status.HTTP_201_CREATED)


class MyInvestorDeactivate(APIView):

    @transaction.atomic
    def post(self, request, format=None):
        investor = request.user.conference_user.investor

        # Check if the current user even has an investor
        if not investor:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        investor.is_active = False
        investor.save()
        return HttpResponse()


class MyInvestorReactivate(APIView):

    @transaction.atomic
    def post(self, request, format=None):
        investor = request.user.conference_user.investor

        # Check if the current user even has an investor
        if not investor:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        investor.is_active = True
        investor.save()
        return HttpResponse()
