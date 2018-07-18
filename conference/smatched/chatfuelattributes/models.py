# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class ChatfuelattributesAnswer(models.Model):

    messenger_user_id = models.BigIntegerField(db_index=True)

    survey = models.CharField(db_index=True, max_length=255)

    answer_number = models.PositiveSmallIntegerField(db_index=True)

    answer_text = models.TextField(blank=True)

    def __str__(self):
        return '({}, {}, {}, {})'.format(self.messenger_user_id, self.survey, self.answer_number, self.answer_text)

    class Meta:
        unique_together = ('messenger_user_id', 'survey', 'answer_number',)
