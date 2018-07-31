# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from dateutil import parser
from django.http import HttpResponse
from urlparse import parse_qs
from . import get_tweets
from . import models
import logging

log = logging.getLogger(__name__)


def screen_names(request):
    print 'screen_names called with request method "{}" and body "{}"'.format(request.method, request.body)
    log.info('screen_names called with request method "{}" and body "{}"'.format(request.method, request.body))
    body_dict = parse_qs(request.body)
    raw_screen_name = body_dict.get('screen name')
    if not raw_screen_name:
        return HttpResponse(status=400)
    screen_name = raw_screen_name[0]

    print screen_name

    # Delete existing tweets
    models.Status.objects.filter(user_screen_name=screen_name).delete()

    tweets = get_tweets.getTweets(screen_name)

    for tweet in tweets:
        print tweet
        models.Status.objects.create(
            id_str=tweet[0],
            text=tweet[2],
            user_screen_name=screen_name,
        )
    return HttpResponse(status=201)
