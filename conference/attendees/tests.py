# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.test import TestCase
import json
from . import models
from . import views


class SharedListViewMixin(object):

    def test_get(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 200)

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 201)


class SharedDetailViewMixin(object):

    def test_get_404(self):
        response = self.client.get(
            reverse(self.view(), kwargs={'pk': 1})
        )
        self.assertEqual(response.status_code, 404)

    def test_post(self):
        response = self.client.post(
            reverse(self.view(), kwargs={'pk': 1})
        )
        self.assertEqual(response.status_code, 405)


class InvestorsViewTest(TestCase, SharedListViewMixin):

    def view(self):
        return 'investor_list'

    def test_post_max(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'country': 'DE',
                'description': 'aaaaaaaa',
                'funding_stages': [1, 2, 3],
                'giveaways': [1, 2, 3],
                'max_ticket': 999999999999,
                'min_ticket': 999999999999,
                'name': 'aaaaaaaa',
                'product_stages': [1, 2, 3],
                'tagline': 'aaaaaaaa',
                'token_types': [1, 2, 3],
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 201)


class InvestorsIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return 'investor_detail'

    def test_get(self):
        investor = models.Investor.objects.create(
            country='DE',
            description='aaaaaaaa',
            max_ticket=999999999999,
            min_ticket=999999999999,
            name='aaaaaaaa',
            tagline='aaaaaaaa',
        )
        investor.funding_stages = models.FundingStage.objects.all()
        investor.giveaways = models.Giveaway.objects.all()
        investor.product_stages = models.ProductStage.objects.all()
        investor.token_types = models.TokenType.objects.all()
        investor.save()
        response = self.client.get(
            reverse(self.view(), kwargs={'pk': investor.id}),
        )
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), investor.id)
        self.assertEqual(response_dict.get('country'), 'DE')
        self.assertEqual(response_dict.get('description'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('funding_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('giveaways'), [1, 2, 3])
        self.assertEqual(response_dict.get('max_ticket'), '999999999999')
        self.assertEqual(response_dict.get('min_ticket'), '999999999999')
        self.assertEqual(response_dict.get('name'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('product_stages'), [1, 2, 3])
        self.assertEqual(response_dict.get('tagline'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('token_types'), [1, 2, 3])


class ProjectsViewTest(TestCase, SharedListViewMixin):

    def view(self):
        return 'project_list'

    def test_post_max(self):
        response = self.client.post(
            reverse(self.view()),
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
        self.assertEqual(response.status_code, 201)


class ProjectsIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return 'project_detail'

    def test_get(self):
        project = models.Project.objects.create(
            country='DE',
            description='aaaaaaaa',
            funding_stage=models.FundingStage.objects.get(id=1),
            giveaway=models.Giveaway.objects.get(id=1),
            name='aaaaaaaa',
            notable='aaaaaaaa',
            product_stage=models.ProductStage.objects.get(id=1),
            tagline='aaaaaaaa',
            token_type=models.TokenType.objects.get(id=1),
        )
        response = self.client.get(
            reverse(self.view(), kwargs={'pk': project.id}),
        )
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), project.id)
        self.assertEqual(response_dict.get('country'), 'DE')
        self.assertEqual(response_dict.get('description'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('funding_stage'), 1)
        self.assertEqual(response_dict.get('giveaway'), 1)
        self.assertEqual(response_dict.get('name'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('notable'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('product_stage'), 1)
        self.assertEqual(response_dict.get('tagline'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('token_type'), 1)


class UsersViewTest(TestCase):

    def view(self):
        return 'user_list'

    def test_get(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 200)

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
        )
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data, 'email_exists')
        self.assertEqual(models.User.objects.count(), 1)
        self.assertEqual(models.ConferenceUser.objects.count(), 1)

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
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('email'), 'a@b.cc')
        self.assertEqual(response.data.get('first_name'), 'Foo')
        self.assertEqual(response.data.get('last_name'), 'Bar')
        self.assertIn('id', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('username', response.data)

        user = models.User.objects.get()
        self.assertEqual(user.email, 'a@b.cc')
        self.assertEqual(user.first_name, 'Foo')
        self.assertEqual(user.last_name, 'Bar')
        self.assertEqual(user.username, 'a@b.cc')
        self.assertIsNotNone(user.password)

        conference_user = models.ConferenceUser.objects.get()
        self.assertEqual(conference_user.user, user)

    def test_post_min(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'A@b.Cc',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('email'), 'a@b.cc')
        self.assertEqual(response.data.get('first_name'), '')
        self.assertEqual(response.data.get('last_name'), '')
        self.assertIn('id', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('username', response.data)

        user = models.User.objects.all().get()
        self.assertEqual(user.email, 'a@b.cc')
        self.assertEqual(user.first_name, '')
        self.assertEqual(user.last_name, '')
        self.assertEqual(user.username, 'a@b.cc')
        self.assertIsNotNone(user.password)

        conference_user = models.ConferenceUser.objects.get()
        self.assertEqual(conference_user.user, user)

    def test_post_email_none(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
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
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, 'password_missing')

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 400)


class UsersIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return 'user_detail'

    def test_get(self):
        user = models.User.objects.create(
            email='a@b.cc',
            password='aaaaaaaa',
        )
        response = self.client.get(
            reverse(self.view(), kwargs={'pk': user.id}),
        )
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), user.id)
        self.assertEqual(response_dict.get('email'), 'a@b.cc')
        self.assertEqual(response_dict.get('first_name'), '')
        self.assertEqual(response_dict.get('last_name'), '')
