# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.hashers import make_password
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
import json
import logging
from .models import ConferenceUser
from .models import Investor
from .models import InvestorFundingStage
from .models import InvestorProductStage
from .models import InvestorTokenType
from .models import Project
from .models import User

log = logging.getLogger(__name__)


def _fill_company(json_body):
    country = json_body.get('country')
    description = json_body.get('description')
    name = json_body.get('name')
    tagline = json_body.get('tagline')
    return country, description, name, tagline


def investors(request):
    log.info('investors called with request method "{}" and body "{}"'.format(request.method, request.body))
    if not request.method == 'POST':
        return HttpResponse(status=405)

    try:
        json_body = json.loads(request.body)
    except ValueError:
        return JsonResponse({}, status=400)

    country, description, name, tagline = _fill_company(json_body)
    funding_stages = json_body.get('funding_stages')
    max_ticket = json_body.get('max_ticket')
    min_ticket = json_body.get('min_ticket')
    product_stages = json_body.get('product_stages')
    token_types = json_body.get('token_types')
    investor = Investor.objects.create(
        country=country,
        description=description,
        max_ticket=max_ticket,
        min_ticket=min_ticket,
        name=name,
        tagline=tagline,
    )
    for funding_stage in funding_stages:
        InvestorFundingStage.objects.create(
            investor=investor,
            funding_stage=funding_stage,
        )
    for product_stage in product_stages:
        InvestorProductStage.objects.create(
            investor=investor,
            product_stage=product_stage,
        )
    for token_type in token_types:
        InvestorTokenType.objects.create(
            investor=investor,
            token_type=token_type,
        )
    # TODO assign to user
    return JsonResponse({'id': investor.id}, status=201)


def investors_id(request, pk):
    log.info('investors_id called with request method "{}" and body "{}"'.format(request.method, request.body))
    if request.method == 'GET':
        investor = get_object_or_404(Investor, id=pk)
        return JsonResponse({
            'id': investor.id,
            'country': investor.country,
            'description': investor.description,
            'max_ticket': int(investor.max_ticket),
            'min_ticket': int(investor.min_ticket),
            'name': investor.name,
            'tagline': investor.tagline,
        }, status=200)
    return HttpResponse(status=405)


def projects(request):
    log.info('projects called with request method "{}" and body "{}"'.format(request.method, request.body))
    if not request.method == 'POST':
        return HttpResponse(status=405)

    try:
        json_body = json.loads(request.body)
    except ValueError:
        return JsonResponse({}, status=400)

    country, description, name, tagline = _fill_company(json_body)
    funding_stage = json_body.get('funding_stage')
    giveaway = json_body.get('giveaway')
    notable = json_body.get('notable')
    product_stage = json_body.get('product_stage')
    token_type = json_body.get('token_type')
    project = Project.objects.create(
        country=country,
        description=description,
        funding_stage=funding_stage,
        giveaway=giveaway,
        name=name,
        notable=notable,
        product_stage=product_stage,
        tagline=tagline,
        token_type=token_type,
    )
    # TODO assign to user
    return JsonResponse({'id': project.id}, status=201)


def projects_id(request, pk):
    log.info('projects_id called with request method "{}" and body "{}"'.format(request.method, request.body))
    if request.method == 'GET':
        project = get_object_or_404(Project, id=pk)
        return JsonResponse({
            'id': project.id,
            'country': project.country,
            'description': project.description,
            'funding_stage': project.funding_stage,
            'giveaway': project.giveaway,
            'name': project.name,
            'notable': project.notable,
            'product_stage': project.product_stage,
            'tagline': project.tagline,
            'token_type': project.token_type,
        }, status=200)
    return HttpResponse(status=405)


def users(request):
    log.info('users called with request method "{}" and body "{}"'.format(request.method, request.body))
    if not request.method == 'POST':
        return HttpResponse(status=405)

    try:
        json_body = json.loads(request.body)
    except ValueError:
        return JsonResponse({}, status=400)

    email = json_body.get('email')
    password = json_body.get('password')
    user = User.objects.create(
        email=email,
        first_name='',
        last_name='',
        password=make_password(password),
        username=email,
    )
    conference_user = ConferenceUser.objects.create(
        user=user,
    )
    return JsonResponse({'id': user.id}, status=201)


def users_id(request, pk):
    log.info('users_id called with request method "{}" and body "{}"'.format(request.method, request.body))
    if request.method == 'GET':
        user = get_object_or_404(User, id=pk)
        return JsonResponse({
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }, status=200)
    return HttpResponse(status=405)
