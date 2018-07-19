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


class UsersViewTest(TestCase, SharedListViewMixin):

    def view(self):
        return 'user_list'

    def test_post_min(self):
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'a@b.cc',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 201)


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
