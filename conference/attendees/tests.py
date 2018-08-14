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


class SharedDetailViewMixin(object):

    def test_get_404(self):
        response = self.client.get(reverse(self.view(), kwargs={'pk': 42}), **self.header)
        self.assertEqual(response.status_code, 404)

    def test_post(self):
        response = self.client.post(reverse(self.view(), kwargs={'pk': 42}), **self.header)
        self.assertEqual(response.status_code, 405)


class MyPersonTest(AuthMixin):

    def view(self):
        return 'my_person'

    def test_get_401(self):
        response = self.client.get(reverse(self.view()))
        self.assertEqual(response.status_code, 401)

    def test_get_nonexisting(self):
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 200)

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

    def test_put(self):
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'first_name': 'foo',
                'last_name': 'bar',
                'title': 'aaaaaaaa',
                'company': 'aaaaaaaa',
                'twitter': 'aaaaaaaa',
                'facebook': 'aaaaaaaa',
                'telegram': 'aaaaaaaa',
                'linkedin': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('user'), self.user.id)
        self.assertEqual(response.data.get('first_name'), 'foo')
        self.assertEqual(response.data.get('last_name'), 'bar')
        self.assertEqual(response.data.get('title'), 'aaaaaaaa')
        self.assertEqual(response.data.get('company'), 'aaaaaaaa')
        self.assertEqual(response.data.get('twitter'), 'aaaaaaaa')
        self.assertEqual(response.data.get('facebook'), 'aaaaaaaa')
        self.assertEqual(response.data.get('telegram'), 'aaaaaaaa')
        self.assertEqual(response.data.get('linkedin'), 'aaaaaaaa')
        self.assertNotIn('id', response.data)

        self.assertEqual(models.ConferenceUser.objects.count(), 1)

        user = models.ConferenceUser.objects.get(pk=self.user.id)
        self.assertEqual(user.user, self.user)
        self.assertEqual(user.user.first_name, 'foo')
        self.assertEqual(user.user.last_name, 'bar')
        self.assertEqual(user.title, 'aaaaaaaa')
        self.assertEqual(user.company, 'aaaaaaaa')
        self.assertEqual(user.twitter, 'aaaaaaaa')
        self.assertEqual(user.facebook, 'aaaaaaaa')
        self.assertEqual(user.telegram, 'aaaaaaaa')
        self.assertEqual(user.linkedin, 'aaaaaaaa')

    def test_put_no_data(self):
        response = self.client.put(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('user'), self.user.id)
        self.assertEqual(response.data.get('first_name'), '')
        self.assertEqual(response.data.get('last_name'), '')
        self.assertEqual(response.data.get('title'), '')
        self.assertEqual(response.data.get('company'), '')
        self.assertEqual(response.data.get('twitter'), '')
        self.assertEqual(response.data.get('facebook'), '')
        self.assertEqual(response.data.get('telegram'), '')
        self.assertEqual(response.data.get('linkedin'), '')
        self.assertNotIn('id', response.data)

        self.assertEqual(models.ConferenceUser.objects.count(), 1)

        user = models.ConferenceUser.objects.get(pk=self.user.id)
        self.assertEqual(user.user, self.user)
        self.assertEqual(user.user.first_name, '')
        self.assertEqual(user.user.last_name, '')
        self.assertEqual(user.title, '')
        self.assertEqual(user.company, '')
        self.assertEqual(user.twitter, '')
        self.assertEqual(user.facebook, '')
        self.assertEqual(user.telegram, '')
        self.assertEqual(user.linkedin, '')

    def test_put_override(self):
        # Put a fat person.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'first_name': 'foo',
                'last_name': 'bar',
                'title': 'aaaaaaaa',
                'company': 'aaaaaaaa',
                'twitter': 'aaaaaaaa',
                'facebook': 'aaaaaaaa',
                'telegram': 'aaaaaaaa',
                'linkedin': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        # Put a slim person.
        response = self.client.put(reverse(self.view()), **self.header)
        # Have that work and result in just one person.
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('user'), self.user.id)
        self.assertEqual(response.data.get('first_name'), '')
        self.assertEqual(response.data.get('last_name'), '')
        self.assertEqual(response.data.get('title'), '')
        self.assertEqual(response.data.get('company'), '')
        self.assertEqual(response.data.get('twitter'), '')
        self.assertEqual(response.data.get('facebook'), '')
        self.assertEqual(response.data.get('telegram'), '')
        self.assertEqual(response.data.get('linkedin'), '')
        self.assertNotIn('id', response.data)

        self.assertEqual(models.ConferenceUser.objects.count(), 1)

        user = models.ConferenceUser.objects.get(pk=self.user.id)
        self.assertEqual(user.user, self.user)
        self.assertEqual(user.user.first_name, '')
        self.assertEqual(user.user.last_name, '')
        self.assertEqual(user.title, '')
        self.assertEqual(user.company, '')
        self.assertEqual(user.twitter, '')
        self.assertEqual(user.facebook, '')
        self.assertEqual(user.telegram, '')
        self.assertEqual(user.linkedin, '')


class MyProfessionalTest(AuthMixin):

    def view(self):
        return 'my_professional'

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

    def test_put(self):
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'role': 12,
                'role_other_text': 'aaaaaaaa',
                'skills': [{'id': 1}, {'id': 2}, {'id': 3}],
                'traits': [{'id': 1}, {'id': 2}, {'id': 3}],
                'know_most': 'aaaaaaaa',
                'local_remote_options': [1, 2],
                'country': 'us',
                'city': 'aaaaaaaa',
                'age': 42,
                'experience': 23,
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('role'), 12)
        self.assertEqual(response_dict.get('role_other_text'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('skills'), [1, 2, 3])
        self.assertEqual(response_dict.get('traits'), [1, 2, 3])
        self.assertEqual(response_dict.get('know_most'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('local_remote_options'), [1, 2])
        self.assertEqual(response_dict.get('country'), 'us')
        self.assertEqual(response_dict.get('city'), 'aaaaaaaa')
        self.assertEqual(response_dict.get('age'), 42)
        self.assertEqual(response_dict.get('experience'), 23)
        self.assertNotIn('id', response_dict)

        self.assertEqual(models.Professional.objects.count(), 1)

    def test_put_no_data(self):
        response = self.client.put(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('role'), 12)
        self.assertEqual(response_dict.get('role_other_text'), '')
        self.assertEqual(response_dict.get('skills'), [])
        self.assertEqual(response_dict.get('traits'), [])
        self.assertEqual(response_dict.get('know_most'), '')
        self.assertEqual(response_dict.get('local_remote_options'), [2])
        self.assertEqual(response_dict.get('country'), '')
        self.assertEqual(response_dict.get('city'), '')
        self.assertEqual(response_dict.get('age'), None)
        self.assertEqual(response_dict.get('experience'), None)
        self.assertNotIn('id', response_dict)

        self.assertEqual(models.Professional.objects.count(), 1)

    def test_put_override(self):
        # Put a fat professional.
        response = self.client.put(
            reverse(self.view()),
            json.dumps({
                'role': 12,
                'role_other_text': 'aaaaaaaa',
                'skills': [{'id': 1}, {'id': 2}, {'id': 3}],
                'traits': [{'id': 1}, {'id': 2}, {'id': 3}],
                'know_most': 'aaaaaaaa',
                'local_remote_options': [1, 2],
                'country': 'us',
                'city': 'aaaaaaaa',
                'age': 42,
                'experience': 23,
            }),
            content_type='application/json',
            **self.header
        )
        # Put a slim professional.
        response = self.client.put(reverse(self.view()), **self.header)
        # Have that work and result in just one professional.
        self.assertEqual(response.status_code, 201)
        response_dict = json.loads(response.content)
        self.assertEqual(response_dict.get('role'), 12)
        self.assertEqual(response_dict.get('role_other_text'), '')
        self.assertEqual(response_dict.get('skills'), [])
        self.assertEqual(response_dict.get('traits'), [])
        self.assertEqual(response_dict.get('know_most'), '')
        self.assertEqual(response_dict.get('local_remote_options'), [2])
        self.assertEqual(response_dict.get('country'), '')
        self.assertEqual(response_dict.get('city'), '')
        self.assertEqual(response_dict.get('age'), None)
        self.assertEqual(response_dict.get('experience'), None)
        self.assertNotIn('id', response_dict)

        self.assertEqual(models.Professional.objects.count(), 1)


class ProfessionalsTest(AuthMixin):

    def view(self):
        return 'professionals'

    def test_get_one(self):
        self.user.first_name = 'foo'
        self.user.last_name = 'bar'
        self.user.save()
        self.user.conference_user.title = 'title'
        self.user.conference_user.company = 'company'
        self.user.conference_user.twitter = 'twitter'
        self.user.conference_user.facebook = 'facebook'
        self.user.conference_user.telegram = 'telegram'
        self.user.conference_user.linkedin = 'linkedin'
        self.user.conference_user.save()
        professional = models.Professional.objects.create(
        )
        self.user.conference_user.professional = professional
        self.user.conference_user.save()
        response = self.client.get(reverse(self.view()), **self.header)
        self.assertEqual(response.status_code, 200)
        response_list = json.loads(response.content)
        self.assertEqual(len(response_list), 1)
        response_professional_0 = response_list[0]
        self.assertEqual(response_professional_0.get('role'), None)
        self.assertEqual(response_professional_0.get('role_other_text'), '')
        self.assertEqual(response_professional_0.get('skills'), [])
        self.assertEqual(response_professional_0.get('traits'), [])
        self.assertEqual(response_professional_0.get('know_most'), '')
        self.assertEqual(response_professional_0.get('local_remote_options'), [])
        self.assertEqual(response_professional_0.get('country'), '')
        self.assertEqual(response_professional_0.get('city'), '')
        self.assertEqual(response_professional_0.get('age'), None)
        self.assertEqual(response_professional_0.get('experience'), None)

        response_conference_user_0 = response_professional_0.get('user')
        self.assertEqual(response_conference_user_0.get('first_name'), 'foo')
        self.assertEqual(response_conference_user_0.get('last_name'), 'bar')
        self.assertEqual(response_conference_user_0.get('title'), 'title')
        self.assertEqual(response_conference_user_0.get('company'), 'company')
        self.assertEqual(response_conference_user_0.get('twitter'), 'twitter')
        self.assertEqual(response_conference_user_0.get('facebook'), 'facebook')
        self.assertEqual(response_conference_user_0.get('telegram'), 'telegram')
        self.assertEqual(response_conference_user_0.get('linkedin'), 'linkedin')


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
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        response = self.client.post(
            reverse(self.view()),
            json.dumps({
                'email': 'a@B.cC',
                'password': 'aaaaaaaa',
            }),
            content_type='application/json',
            **self.header
        )
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data, 'email_exists')
        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(models.ConferenceUser.objects.count(), 2)

    def test_post(self):
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
        self.assertIn('id', response.data)
        self.assertNotIn('first_name', response.data)
        self.assertNotIn('last_name', response.data)
        self.assertNotIn('password', response.data)
        self.assertNotIn('username', response.data)

        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(models.ConferenceUser.objects.count(), 2)

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
