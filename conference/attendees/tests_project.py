# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.authtoken.models import Token
import json
from . import models
from .tests import AuthMixin, SharedDetailViewMixin


class ListProjectTest(AuthMixin):

    def view(self):
        return 'project_list'

    def test_get_401(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_get(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 200)

    def test_post_401(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_post_405(self):
        response = self.client.post(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_put_401(self):
        response = self.client.put(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_put_405(self):
        response = self.client.put(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 405)


class ProjectsIdViewTest(AuthMixin, SharedDetailViewMixin):

    def view(self):
        return 'project_detail'

    def test_get(self):
        project = models.Project.objects.create(
            description='aaaaaaaa',
            funding_stage=models.FundingStage.objects.get(pk=1),
            fundraising_amount=2147483647,
            github='http://www.example.com',
            giveaway=models.Giveaway.objects.get(pk=1),
            industry=models.Industry.objects.get(pk=1),
            legal_country='us',
            main_country='us',
            name='aaaaaaaa',
            news='http://www.example.com',
            notable='aaaaaaaa',
            product_stage=models.ProductStage.objects.get(pk=1),
            size=2147483647,
            tagline='aaaaaaaa',
            telegram='aaaaaaaa',
            token_type=models.TokenType.objects.get(pk=1),
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
        self.assertEqual(response_dict.get('industry'), 1)
        self.assertEqual(response_dict.get('legal_country'), 'us')
        self.assertEqual(response_dict.get('main_country'), 'us')
        self.assertEqual(response_dict.get('name'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('news'), 'http://www.example.com')
        self.assertEqual(response_dict.get('notable'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('product_stage'), 1)
        self.assertEqual(response_dict.get('size'), 2147483647)
        self.assertEqual(response_dict.get('tagline'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('telegram'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('token_type'), 1)
        self.assertEqual(response_dict.get('twitter'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('website'), 'http://www.example.com')
        self.assertEqual(response_dict.get('whitepaper'), 'http://www.example.com')


class MyProjectTest(AuthMixin):

    def view(self):
        return 'my_project'

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
                'description': 'aaaaaaaa',
                'funding_stage': 1,
                'fundraising_amount': 2147483647,
                'github': 'aaaaaaaa',
                'giveaway': 1,
                'industry': 1,
                'legal_country': 'us',
                'main_country': 'us',
                'name': 'aaaaaaaa',
                'news': 'http://www.example.com',
                'notable': 'aaaaaaaa',
                'product_stage': 1,
                'size': 2147483647,
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

        self.assertEqual(models.Project.objects.count(), 1)

    def test_put_min(self):
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'description': '',
                'funding_stage': '',
                'fundraising_amount': 0,
                'github': '',
                'giveaway': '',
                'industry': 1,
                'legal_country': 'us',
                'main_country': 'us',
                'name': 'aaa',
                'news': '',
                'notable': '',
                'product_stage': '',
                'size': 0,
                'tagline': '',
                'telegram': '',
                'token_type': '',
                'twitter': '',
                'website': '',
                'whitepaper': '',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertIn('id', response_dict)
        self.assertEqual(response_dict.get('description'), '')
        self.assertEqual(response_dict.get('funding_stage'), None)
        self.assertEqual(response_dict.get('fundraising_amount'), 0)
        self.assertEqual(response_dict.get('github'), '')
        self.assertEqual(response_dict.get('giveaway'), None)
        self.assertEqual(response_dict.get('industry'), 1)
        self.assertEqual(response_dict.get('legal_country'), 'us')
        self.assertEqual(response_dict.get('main_country'), 'us')
        self.assertEqual(response_dict.get('name'), 'aaa')
        self.assertEqual(response_dict.get('news'), '')
        self.assertEqual(response_dict.get('notable'), '')
        self.assertEqual(response_dict.get('product_stage'), None)
        self.assertEqual(response_dict.get('size'), 0)
        self.assertEqual(response_dict.get('tagline'), '')
        self.assertEqual(response_dict.get('telegram'), '')
        self.assertEqual(response_dict.get('token_type'), None)
        self.assertEqual(response_dict.get('twitter'), '')
        self.assertEqual(response_dict.get('website'), '')
        self.assertEqual(response_dict.get('whitepaper'), '')

        self.assertEqual(models.Project.objects.count(), 1)

    def test_put_override(self):
        # Put a fat project.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'description': 'aaaaaaaa',
                'funding_stage': 1,
                'fundraising_amount': 2147483647,
                'github': 'aaaaaaaa',
                'giveaway': 1,
                'industry': 1,
                'legal_country': 'us',
                'main_country': 'us',
                'name': 'aaaaaaaa',
                'news': 'http://www.example.com',
                'notable': 'aaaaaaaa',
                'product_stage': 1,
                'size': 2147483647,
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
        # Put a slim project.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'description': '',
                'funding_stage': '',
                'fundraising_amount': 0,
                'github': '',
                'giveaway': '',
                'industry': 1,
                'legal_country': 'us',
                'main_country': 'us',
                'name': 'aaa',
                'news': '',
                'notable': '',
                'product_stage': '',
                'size': 0,
                'tagline': '',
                'telegram': '',
                'token_type': '',
                'twitter': '',
                'website': '',
                'whitepaper': '',
            }),
            content_type='application/json',
            **self.header
        )
        # Have that work and result in just one project.
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertIn('id', response_dict)
        self.assertEqual(response_dict.get('description'), '')
        self.assertEqual(response_dict.get('funding_stage'), None)
        self.assertEqual(response_dict.get('fundraising_amount'), 0)
        self.assertEqual(response_dict.get('github'), '')
        self.assertEqual(response_dict.get('giveaway'), None)
        self.assertEqual(response_dict.get('industry'), 1)
        self.assertEqual(response_dict.get('legal_country'), 'us')
        self.assertEqual(response_dict.get('main_country'), 'us')
        self.assertEqual(response_dict.get('name'), 'aaa')
        self.assertEqual(response_dict.get('news'), '')
        self.assertEqual(response_dict.get('notable'), '')
        self.assertEqual(response_dict.get('product_stage'), None)
        self.assertEqual(response_dict.get('size'), 0)
        self.assertEqual(response_dict.get('tagline'), '')
        self.assertEqual(response_dict.get('telegram'), '')
        self.assertEqual(response_dict.get('token_type'), None)
        self.assertEqual(response_dict.get('twitter'), '')
        self.assertEqual(response_dict.get('website'), '')
        self.assertEqual(response_dict.get('whitepaper'), '')

        self.assertEqual(models.Project.objects.count(), 1)


class MyProjectJobsTest(AuthMixin):

    def view(self):
        return 'my_project_jobs'

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

    def test_post_404(self):
        response = self.client.post(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo regular post test


class MyProjectJobsIdTest(AuthMixin):

    def view(self):
        return 'my_project_jobs_id'

    def test_delete_401(self):
        response = self.client.delete(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_delete_404_project(self):
        response = self.client.delete(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo test_delete_404_job_listing

    # todo regular delete test

    def test_get_401(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_get_404(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo regular get test

    def test_post_401(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_post_405(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_put_401(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_put_404(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo regular put test


class MyProjectMembersTest(AuthMixin):

    def view(self):
        return 'my_project_members'

    def test_get_401(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_get_404(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo regular get test

    # todo test_post_400 tests

    def test_post_401(self):
        response = self.client.post(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_put_401(self):
        response = self.client.put(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_put_405(self):
        response = self.client.put(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 405)


class MyProjectMembersIdTest(AuthMixin):

    def view(self):
        return 'my_project_members_id'

    def test_delete_401(self):
        response = self.client.delete(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_delete_404_project(self):
        response = self.client.delete(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 404)

    # todo test_delete_404_member

    # todo regular delete test

    def test_get_401(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_get_405(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_post_401(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_post_405(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 405)

    def test_put_401(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': 1}))
        self.assertEqual(response.status_code, 401)

    def test_put_405(self):
        response = self.client.put(reverse(self.view(), kwargs={'pk': 1}), **self.header)
        self.assertEqual(response.status_code, 405)
