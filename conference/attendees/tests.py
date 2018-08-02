# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.authtoken.models import Token
import json
from . import models
from . import views


class AuthMixin(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('test', 'test@example.com', 'test')
        self.token = Token.objects.get(user=self.user).key
        self.header = {'HTTP_AUTHORIZATION': 'Bearer {}'.format(self.token)}

    def tearDown(self):
        User.objects.get(username='test').delete()


class SharedListViewMixin(object):

    def test_get(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 200)

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 201)


class SharedDetailViewMixin(object):

    def test_get_404(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 42}), **self.header)
        self.assertEqual(response.status_code, 404)

    def test_post(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 42}), **self.header)
        self.assertEqual(response.status_code, 405)


class InvestorsViewTest(AuthMixin, SharedListViewMixin):

    def view(self):
        return 'investor_list'

    def test_post_max(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'funding_stages': [1, 2, 3],
                'giveaways': [1, 2, 3],
                'industries': [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                    41,
                ],
                'product_stages': [1, 2, 3],
                'ticket_sizes': [1, 2, 3, 4, 5, 6],
                'token_types': [1, 2, 3],
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)


class InvestorsIdViewTest(AuthMixin, SharedDetailViewMixin):

    def view(self):
        return 'investor_detail'

    def test_get(self):
        investor = models.Investor.objects.create(
        )
        investor.funding_stages = models.FundingStage.objects.all()
        investor.giveaways = models.Giveaway.objects.all()
        investor.industries = models.Industry.objects.all()
        investor.product_stages = models.ProductStage.objects.all()
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
        self.assertEqual(response_dict.get('product_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('ticket_sizes'), [1, 2, 3, 4, 5, 6])
        self.assertEqual(response_dict.get('token_types'), [1, 2, 3])


class ProjectsViewTest(AuthMixin, SharedListViewMixin):

    def view(self):
        return 'project_list'

    def test_post_max(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'description': 'aaaaaaaa',
                'funding_stage': 1,
                'fundraising_amount': 2147483647,
                'github': 'aaaaaaaa',
                'giveaway': 1,
                'name': 'aaaaaaaa',
                'news': 'http://www.example.com',
                'notable': 'aaaaaaaa',
                'product_stage': 1,
                'tagline': 'aaaaaaaa',
                'telegram': 'aaaaaaaa',
                'token_type': 1,
                'twitter': 'aaaaaaaa',
                'website': 'http://www.example.com',
                'whitepaper': 'http://www.example.com',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)


class ProjectsIdViewTest(AuthMixin, SharedDetailViewMixin):

    def view(self):
        return 'project_detail'

    def test_get(self):
        project = models.Project.objects.create(
            description='aaaaaaaa',
            funding_stage=models.FundingStage.objects.get(id=1),
            fundraising_amount=2147483647,
            github='http://www.example.com',
            giveaway=models.Giveaway.objects.get(id=1),
            name='aaaaaaaa',
            news='http://www.example.com',
            notable='aaaaaaaa',
            product_stage=models.ProductStage.objects.get(id=1),
            tagline='aaaaaaaa',
            telegram='aaaaaaaa',
            token_type=models.TokenType.objects.get(id=1),
            twitter='aaaaaaaa',
            website='http://www.example.com',
            whitepaper='http://www.example.com',
        )
        response = self.client.get(reverse(self.view(), kwargs={'pk': project.id}), **self.header)
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), project.id)
        self.assertEqual(response_dict.get('description'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('funding_stage'), 1)
        self.assertEqual(response_dict.get('github'), 'http://www.example.com')
        self.assertEqual(response_dict.get('giveaway'), 1)
        self.assertEqual(response_dict.get('name'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('news'), 'http://www.example.com')
        self.assertEqual(response_dict.get('notable'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('product_stage'), 1)
        self.assertEqual(response_dict.get('tagline'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('telegram'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('token_type'), 1)
        self.assertEqual(response_dict.get('twitter'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('website'), 'http://www.example.com')
        self.assertEqual(response_dict.get('whitepaper'), 'http://www.example.com')


class UsersViewTest(AuthMixin):

    def view(self):
        return 'user_list'

    def test_get(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_post_existing(self):
        self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
                'first_name': 'Foo',
                'last_name': 'Bar',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'a@B.cC',
                'first_name': 'Foo',
                'last_name': 'Bar',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data, 'email_exists')
        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(models.ConferenceUser.objects.count(), 0)

    def test_post_max(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
                'first_name': 'Foo',
                'last_name': 'Bar',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('email'), 'a@b.cc')
        self.assertEqual(response.data.get('first_name'), 'Foo')
        self.assertEqual(response.data.get('last_name'), 'Bar')
        self.assertIn('id', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('username', response.data)

        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(models.ConferenceUser.objects.count(), 0)

        user = models.User.objects.get(email='a@b.cc')
        self.assertEqual(user.email, 'a@b.cc')
        self.assertEqual(user.first_name, 'Foo')
        self.assertEqual(user.last_name, 'Bar')
        self.assertEqual(user.username, 'a@b.cc')
        self.assertIsNotNone(user.password)

    def test_post_min(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('email'), 'a@b.cc')
        self.assertEqual(response.data.get('first_name'), '')
        self.assertEqual(response.data.get('last_name'), '')
        self.assertIn('id', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('username', response.data)

        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(models.ConferenceUser.objects.count(), 0)

        user = models.User.objects.get(email='a@b.cc')
        self.assertEqual(user.email, 'a@b.cc')
        self.assertEqual(user.first_name, '')
        self.assertEqual(user.last_name, '')
        self.assertEqual(user.username, 'a@b.cc')
        self.assertIsNotNone(user.password)

    def test_post_email_none(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'email_missing')

    def test_post_email_empty(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': '',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'email_missing')

    def test_post_password_none(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'password_missing')

    def test_post_password_empty(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
                'password': '',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'password_missing')

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 400)


class UsersIdViewTest(SharedDetailViewMixin):

    def view(self):
        return 'user_detail'

    def test_get(self):
        user = models.User.objects.create(
            email='a@b.cc',
            password='aaaaaaaa',
        )
        response = self.client.get(reverse(self.view(), kwargs={'pk': user.id}), **self.header)
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), user.id)
        self.assertEqual(response_dict.get('email'), 'a@b.cc')
        self.assertEqual(response_dict.get('first_name'), '')
        self.assertEqual(response_dict.get('last_name'), '')
