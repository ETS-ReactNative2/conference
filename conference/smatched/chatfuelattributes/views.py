# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from urlparse import parse_qs
from . import models
import logging
import re

log = logging.getLogger(__name__)
survey_answer_re = re.compile(r'^([a-z]+)([0-9]+)$')


def chatfuelattributes(request):
    log.info('chatfuelattributes called with request method "{}" and body "{}"'.format(request.method, request.body))
    body_dict = parse_qs(request.body)
    raw_messenger_user_id = body_dict.get('messenger user id')
    if not raw_messenger_user_id:
        return HttpResponse(status=400)
    messenger_user_id = int(raw_messenger_user_id[0])
    for pair in body_dict.items():
        match_object = survey_answer_re.match(pair[0])
        if match_object:
            survey = match_object.group(1)
            answer_number = int(match_object.group(2))
            answer_text = pair[1][0]
            query_set = models.ChatfuelattributesAnswer.objects.filter(
                messenger_user_id=messenger_user_id,
                survey=survey,
                answer_number=answer_number,
            )
            if query_set:
                answer = query_set[0]
            else:
                answer = models.ChatfuelattributesAnswer(
                    messenger_user_id=messenger_user_id,
                    survey=survey,
                    answer_number=answer_number
                )
            answer.answer_text = answer_text
            answer.save()
    return HttpResponse(status=200)
