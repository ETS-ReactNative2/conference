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


class InvestorsIdMessagesTest(TestCase):

    def setUp(self):
        self.user_noproject = User.objects.create_user(
            'user_noproject',
            'user_noproject@example.com',
            'user_noproject',
            **{
                'first_name': 'user_noproject_first_name',
                'last_name': 'user_noproject_last_name',
            }
        )
        self.token_noproject = Token.objects.get(user=self.user_noproject).key
        self.header_noproject = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(self.token_noproject)}

        self.user_yesproject = User.objects.create_user(
            'user_yesproject',
            'user_yesproject@example.com',
            'user_yesproject',
            **{
                'first_name': 'user_yesproject_first_name',
                'last_name': 'user_yesproject_last_name',
            }
        )
        self.project = models.Project.objects.create(
            industry=models.Industry.objects.get(pk=1),
        )
        self.user_yesproject.conference_user.project = self.project
        self.user_yesproject.conference_user.save()
        self.token_yesproject = Token.objects.get(user=self.user_yesproject).key
        self.header_yesproject = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(self.token_yesproject)}

        self.investor_user = User.objects.create_user(
            'investor',
            'investor@example.com',
            'investor',
            **{
                'first_name': 'investor_first_name',
                'last_name': 'investor_last_name',
            }
        )
        self.investor = models.Investor.objects.create()
        self.investor_user.conference_user.investor = self.investor
        self.investor_user.conference_user.save()

    def tearDown(self):
        self.user_noproject.delete()
        self.user_yesproject.delete()
        self.investor.delete()
        self.investor_user.delete()

    def view(self):
        return 'investors_id_messages'

    def test_get_401(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': self.investor.pk}))
        self.assertEqual(response.status_code, 401)

    def test_get_405(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': self.investor.pk}), **self.header_yesproject)
        self.assertEqual(response.status_code, 405)

    def test_post_400(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': self.investor.pk}), **self.header_yesproject)
        self.assertEqual(response.status_code, 400)

    def test_post_401(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': self.investor.pk}))
        self.assertEqual(response.status_code, 401)

    def test_post_403(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': self.investor.pk}), **self.header_noproject)
        self.assertEqual(response.status_code, 403)

    def test_post_404(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': self.investor.pk + 1}), **self.header_yesproject)
        self.assertEqual(response.status_code, 404)

    def test_post(self):
        response = self.client.post(
            reverse(self.view(), kwargs={'pk': self.investor.pk}),
            json.dumps({
                'message': 'Hello, World!',
            }),
            content_type='application/json',
            **self.header_yesproject
        )
        self.assertEqual(response.status_code, 201)

    def test_put_401(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': self.investor.pk}))
        self.assertEqual(response.status_code, 401)

    def test_put_405(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': self.investor.pk}), **self.header_yesproject)
        self.assertEqual(response.status_code, 405)


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
        self.assertEqual(response_dict.get('nationality'), 'US')
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
