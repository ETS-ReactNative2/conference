# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from urlparse import parse_qs
from . import models
import logging

log = logging.getLogger(__name__)


def users(request):
    print 'users called with request method "{}" and body "{}"'.format(request.method, request.body)
    log.info('users called with request method "{}" and body "{}"'.format(request.method, request.body))
    body_dict = parse_qs(request.body)
    raw_messenger_user_id = body_dict.get('messenger user id')
    if not raw_messenger_user_id:
        return HttpResponse(status=400)
    messenger_user_id = int(raw_messenger_user_id[0])
    query_set = models.SmatchedUser.objects.filter(messenger_user_id=messenger_user_id)
    if query_set:
        smatched_user = query_set[0]
    else:
        smatched_user = models.SmatchedUser()
    for pair in body_dict.items():
        key = pair[0].replace(' ', '_')
        value = pair[1][0]
        setattr(smatched_user, key, value)
    smatched_user.save()
    return HttpResponse(status=200)
