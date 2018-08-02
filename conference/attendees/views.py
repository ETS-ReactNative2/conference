# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from . import serializers
import json


class ListCreateInvestor(generics.ListCreateAPIView):
    queryset = models.Investor.objects.all()
    serializer_class = serializers.InvestorSerializer

    def get_queryset(self):
        filters = {}
        excludes = {}
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
        if region == models.Region.ANYWHERE_EXCEPT_UNITED_STATES:
            excludes['nationality'] = models.Region.COUNTRY_UNITED_STATES
        elif region == models.Region.SOUTH_KOREA_ONLY:
            filters['nationality'] = models.Region.COUNTRY_SOUTH_KOREA
        token_types = self.request.GET.getlist('token_type')
        if token_types:
            filters['token_types__in'] = token_types
        return models.Investor.objects.filter(**filters).exclude(**excludes)


class ListCreateProject(generics.ListCreateAPIView):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        filters = {}
        excludes = {}
        funding_stages = self.request.GET.getlist('funding_stage')
        if funding_stages:
            filters['funding_stage__in'] = funding_stages
        giveaways = self.request.GET.getlist('giveaway')
        if giveaways:
            # Projects with giveaway BOTH are always found.
            giveaways.append(models.Giveaway.BOTH)
            filters['giveaway__in'] = giveaways
        product_stages = self.request.GET.getlist('product_stage')
        if product_stages:
            filters['product_stage__in'] = product_stages
        region = self.request.GET.get('region')
        if region == models.Region.ANYWHERE_EXCEPT_UNITED_STATES:
            excludes['legal_country'] = models.Region.COUNTRY_UNITED_STATES
            excludes['main_country'] = models.Region.COUNTRY_UNITED_STATES
        token_types = self.request.GET.getlist('token_type')
        if token_types:
            filters['token_types__in'] = token_types
        return models.Project.objects.filter(**filters).exclude(**excludes)


class ListCreateUser(APIView):
    permission_classes = (permissions.AllowAny,)

    @transaction.atomic
    def post(self, request, format=None):
        json_body = request.data
        email = json_body.get('email')
        first_name = json_body.get('first_name')
        last_name = json_body.get('last_name')
        password = json_body.get('password')

        # email None or ''
        if not email:
            return Response('email_missing', status=status.HTTP_400_BAD_REQUEST)

        # password None or ''
        if not password:
            return Response('password_missing', status=status.HTTP_400_BAD_REQUEST)

        clean_email = email.lower()

        if models.User.objects.filter(email=clean_email).exists():
            return Response('email_exists', status=status.HTTP_409_CONFLICT)

        if models.User.objects.filter(username=clean_email).exists():
            return Response('username_exists', status=status.HTTP_409_CONFLICT)

        clean_first_name = first_name if first_name is not None else ''

        clean_last_name = last_name if last_name is not None else ''

        user = models.User.objects.create(
            email=clean_email,
            first_name=clean_first_name,
            last_name=clean_last_name,
            password=make_password(password),
            username=clean_email,
        )
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveUpdateDestroyInvestor(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Investor.objects.all()
    serializer_class = serializers.InvestorSerializer


class RetrieveUpdateDestroyProject(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer


def users_id(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(models.User, id=pk)
        return JsonResponse({
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }, status=200)
    return HttpResponse(status=405)
