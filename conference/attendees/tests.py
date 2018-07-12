# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.test import TestCase
import json
from .views import investors, projects, users


class SharedTestMixin(object):

    def test_get(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 400)

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()))
        self.assertEquals(response.status_code, 400)


class InvestorsViewTest(TestCase, SharedTestMixin):

    def view(self):
        return investors

    def test_post_max(self):
        response = self.client.post(
            reverse(investors),
            json.dumps({
                'country': 'DE',
                'description': 'aaaaaaaa',
                'funding_stages': [1, 2, 3],
                'max_ticket': 999999999999,
                'min_ticket': 999999999999,
                'name': 'aaaaaaaa',
                'product_stages': [1, 2, 3],
                'tagline': 'aaaaaaaa',
                'token_types': [1, 2, 3],
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)


class ProjectsViewTest(TestCase, SharedTestMixin):

    def view(self):
        return projects

    def test_post_max(self):
        response = self.client.post(
            reverse(projects),
            json.dumps({
                'country': 'DE',
                'description': 'aaaaaaaa',
                'funding_stage': 1,
                'giveaway': 1,
                'name': 'aaaaaaaa',
                'notable': 'aaaaaaaa',
                'product_stage': 1,
                'tagline': 'aaaaaaaa',
                'token_type': 1,
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)


class UsersViewTest(TestCase, SharedTestMixin):

    def view(self):
        return users

    def test_post_min(self):
        response = self.client.post(
            reverse(users),
            json.dumps({
                'email': 'a@b.cc',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
