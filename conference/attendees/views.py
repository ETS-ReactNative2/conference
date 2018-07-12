# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import render
import json
from .models import User


def create_user(request):
    if not request.method == 'POST':
        return JsonResponse({}, status=400)
    json_body = json.loads(request.body)
    email = json_body.get('email')
    password = json_body.get('password')
    user = User.objects.create(
        email=email,
        first_name='',
        last_name='',
        password=make_password(password),
        username=email,
    )
    return JsonResponse({'id': user.id}, status=200)
