# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.test import TestCase
import json
from .models import Company, Investor, Project, User
from .views import investors, investors_id, projects, projects_id, users, users_id


class SharedListViewMixin(object):

    def test_get(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 405)

    def test_post_no_data(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 400)


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
        self.assertEqual(response.status_code, 201)


class InvestorsIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return investors_id

    def test_get(self):
        investor = Investor.objects.create(
            country='DE',
            description='aaaaaaaa',
            max_ticket=999999999999,
            min_ticket=999999999999,
            name='aaaaaaaa',
            tagline='aaaaaaaa',
        )
        response = self.client.get(
            reverse(investors_id, kwargs={'pk': investor.id}),
        )
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), investor.id)
        self.assertEqual(response_dict.get('country'), 'DE')
        self.assertEqual(response_dict.get('description'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('max_ticket'), 999999999999)
        self.assertEqual(response_dict.get('min_ticket'), 999999999999)
        self.assertEqual(response_dict.get('name'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('tagline'), 'aaaaaaaa')


class ProjectsViewTest(TestCase, SharedListViewMixin):

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
        self.assertEqual(response.status_code, 201)


class ProjectsIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return projects_id

    def test_get(self):
        project = Project.objects.create(
            country='DE',
            description='aaaaaaaa',
            funding_stage=Company.FUNDING_STAGE_SEED,
            giveaway=Company.GIVEAWAY_TOKEN,
            name='aaaaaaaa',
            notable='aaaaaaaa',
            product_stage=Company.PRODUCT_STAGE_PRE_PRODUCT,
            tagline='aaaaaaaa',
            token_type=Company.TOKEN_TYPE_PROTOCOL,
        )
        response = self.client.get(
            reverse(projects_id, kwargs={'pk': project.id}),
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
        self.assertEqual(response.status_code, 201)


class UsersIdViewTest(TestCase, SharedDetailViewMixin):

    def view(self):
        return users_id

    def test_get(self):
        user = User.objects.create(
            email='a@b.cc',
            password='aaaaaaaa',
        )
        response = self.client.get(
            reverse(users_id, kwargs={'pk': user.id}),
        )
        self.assertEquals(response.status_code, 200)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('id'), user.id)
        self.assertEqual(response_dict.get('email'), 'a@b.cc')
        self.assertEqual(response_dict.get('first_name'), '')
        self.assertEqual(response_dict.get('last_name'), '')
