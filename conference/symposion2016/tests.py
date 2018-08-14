# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.test import TestCase
import json


class ApiTokenAuthTest(TestCase):

    def view(self):
        return 'api_token_auth'

    def test_post_401(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'username': 'foo@bar.baz',
                'password': 'password',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 401)
