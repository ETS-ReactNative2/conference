# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from . import serializers


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

    def post(self, request, format=None):
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
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
