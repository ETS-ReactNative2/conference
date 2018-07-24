# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from . import serializers
import json


class ListCreateInvestor(generics.ListCreateAPIView):
    queryset = models.Investor.objects.all()
    serializer_class = serializers.InvestorSerializer
    filter_fields = (
        'funding_stages',
        'giveaways',
        'product_stages',
        'token_types',
    )


class ListCreateProject(generics.ListCreateAPIView):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    filter_fields = (
        'funding_stage',
        'giveaway',
        'product_stage',
        'token_type',
    )


class ListCreateUser(APIView):
    def get(self, request, format=None):
        users = models.User.objects.all()
        serializer = serializers.UserSerializer(users, many=True)
        return Response(serializer.data)

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
        models.ConferenceUser.objects.create(
            user=user,
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
