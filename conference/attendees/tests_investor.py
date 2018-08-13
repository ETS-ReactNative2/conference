# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.authtoken.models import Token
import json
from . import models
from .tests import AuthMixin, SharedDetailViewMixin


class ListInvestorTest(AuthMixin):

    def view(self):
        return 'investor_list'

    def test_get(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 200)


class InvestorsIdViewTest(AuthMixin, SharedDetailViewMixin):

    def view(self):
        return 'investor_detail'

    def test_get(self):
        investor = models.Investor.objects.create(
            nationality='us',
            region_other_text='aaaaaaaa',
        )
        investor.funding_stages = models.FundingStage.objects.all()
        investor.giveaways = models.Giveaway.objects.all()
        investor.industries = models.Industry.objects.all()
        investor.product_stages = models.ProductStage.objects.all()
        investor.region = models.Region.objects.get(pk=4)
        investor.ticket_sizes = models.TicketSize.objects.all()
        investor.token_types = models.TokenType.objects.all()
        investor.save()
        response = self.client.get(reverse(self.view(), kwargs={'pk': investor.id}), **self.header)
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), investor.id)
        self.assertEqual(response_dict.get('funding_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('giveaways'), [1, 2, 3])
        self.assertEqual(
            response_dict.get('industries'),
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41,
            ],
        )
        self.assertEqual(response_dict.get('nationality'), 'us')
        self.assertEqual(response_dict.get('product_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('region'), 4)
        self.assertEqual(response_dict.get('region_other_text'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('ticket_sizes'), [1, 2, 3, 4, 5, 6])
        self.assertEqual(response_dict.get('token_types'), [1, 2, 3])


class MyInvestorTest(AuthMixin):

    def view(self):
        return 'my_investor'

    def test_get_401(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_get_404(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo regular get test

    def test_post_401(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_post_405(self):
        response = self.client.post(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_put_401(self):
        response = self.client.put(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_put_max(self):
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'funding_stages': [1, 2, 3],
                'giveaways': [1, 2],
                'industries': [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                    41,
                ],
                'nationality': 'us',
                'product_stages': [1, 2, 3],
                'region': 4,
                'region_other_text': 'aaaaaaaa',
                'ticket_sizes': [1, 2, 3, 4, 5, 6],
                'token_types': [1, 2, 3],
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertIn('id', response_dict)
        self.assertEqual(response_dict.get('funding_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('giveaways'), [1, 2])
        self.assertEqual(
            response_dict.get('industries'),
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41,
            ],
        )
        self.assertEqual(response_dict.get('nationality'), 'us')
        self.assertEqual(response_dict.get('product_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('region'), 4)
        self.assertEqual(response_dict.get('region_other_text'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('ticket_sizes'), [1, 2, 3, 4, 5, 6])
        self.assertEqual(response_dict.get('token_types'), [1, 2, 3])

        self.assertEqual(models.Investor.objects.count(), 1)

    def test_put_min(self):
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'funding_stages': [],
                'giveaways': [],
                'industries': [],
                'nationality': '',
                'product_stages': [],
                'region': '',
                'region_other_text': '',
                'ticket_sizes': [],
                'token_types': [],
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertIn('id', response_dict)
        self.assertEqual(response_dict.get('funding_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('giveaways'), [1, 2])
        self.assertEqual(
            response_dict.get('industries'),
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41,
            ],
        )
        self.assertEqual(response_dict.get('nationality'), '')
        self.assertEqual(response_dict.get('product_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('region'), 1)
        self.assertEqual(response_dict.get('region_other_text'), '')
        self.assertEqual(response_dict.get('ticket_sizes'), [1, 2, 3, 4, 5, 6])
        self.assertEqual(response_dict.get('token_types'), [1, 2, 3])

        self.assertEqual(models.Investor.objects.count(), 1)

    def test_put_override(self):
        # Put a fat investor.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'funding_stages': [1, 2, 3],
                'giveaways': [1, 2],
                'industries': [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                    41,
                ],
                'nationality': 'us',
                'product_stages': [1, 2, 3],
                'region': 4,
                'region_other_text': 'aaaaaaaa',
                'ticket_sizes': [1, 2, 3, 4, 5, 6],
                'token_types': [1, 2, 3],
            }),
            content_type='application/json',
            **self.header
        )
        # Put a slim investor.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'funding_stages': [1],
                'giveaways': [1],
                'industries': [1],
                'nationality': '',
                'product_stages': [1],
                'region': '',
                'region_other_text': '',
                'ticket_sizes': [1],
                'token_types': [1],
            }),
            content_type='application/json',
            **self.header
        )
        # Have that work and result in just one investor.
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertIn('id', response_dict)
        self.assertEqual(response_dict.get('funding_stages'), [1])
        self.assertEqual(response_dict.get('giveaways'), [1])
        self.assertEqual(response_dict.get('industries'), [1])
        self.assertEqual(response_dict.get('nationality'), '')
        self.assertEqual(response_dict.get('product_stages'), [1])
        self.assertEqual(response_dict.get('region'), 1)
        self.assertEqual(response_dict.get('region_other_text'), '')
        self.assertEqual(response_dict.get('ticket_sizes'), [1])
        self.assertEqual(response_dict.get('token_types'), [1])

        self.assertEqual(models.Investor.objects.count(), 1)
