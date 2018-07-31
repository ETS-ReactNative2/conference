# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Status(models.Model):

    id_str = models.CharField(primary_key=True, max_length=18)

    text = models.CharField(max_length=280)

    user_screen_name = models.CharField(max_length=15)

    def __str__(self):
        return '({}, {}, {})'.format(self.id_str, self.text, self.user_screen_name)
