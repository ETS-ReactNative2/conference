# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from . import serializers


class MyPerson(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if models.ConferenceUser.objects.filter(user=request.user).exists():
            conference_user = models.ConferenceUser.objects.get(user=request.user)
        else:
            conference_user = models.ConferenceUser.objects.create(user=request.user)

        return JsonResponse(serializers.ConferenceUserSerializer(conference_user).data,
                            status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, format=None):
        json_body = request.data

        if models.ConferenceUser.objects.filter(user=request.user).exists():
            conference_user = models.ConferenceUser.objects.get(user=request.user)
        else:
            conference_user = models.ConferenceUser()
            conference_user.user = request.user

        image_url = json_body.get('image_url')
        clean_image_url = image_url[:models.URL_MAX_LENGTH] if image_url else ''

        first_name = json_body.get('first_name')
        clean_first_name = first_name[:models.FIRST_NAME_MAX_LENGTH] if first_name else ''

        last_name = json_body.get('last_name')
        clean_last_name = last_name[:models.LAST_NAME_MAX_LENGTH] if last_name else ''

        title = json_body.get('title')
        clean_title = title[:models.ConferenceUser.TITLE_MAX_LENGTH] if title else ''

        company = json_body.get('company')
        clean_company = company[:models.ConferenceUser.TITLE_MAX_LENGTH] if company else ''

        twitter = json_body.get('twitter')
        clean_twitter = twitter[:models.ConferenceUser.TWITTER_MAX_LENGTH] if twitter else ''

        facebook = json_body.get('facebook')
        clean_facebook = facebook[:models.ConferenceUser.FACEBOOK_MAX_LENGTH] if facebook else ''

        telegram = json_body.get('telegram')
        clean_telegram = telegram[:models.ConferenceUser.TELEGRAM_MAX_LENGTH] if telegram else ''

        linkedin = json_body.get('linkedin')
        clean_linkedin = linkedin[:models.ConferenceUser.LINKEDIN_MAX_LENGTH] if linkedin else ''

        conference_user.image_url = clean_image_url
        conference_user.first_name = clean_first_name
        conference_user.last_name = clean_last_name
        conference_user.title = clean_title
        conference_user.company = clean_company
        conference_user.twitter = clean_twitter
        conference_user.facebook = clean_facebook
        conference_user.telegram = clean_telegram
        conference_user.linkedin = clean_linkedin

        conference_user.save()
        return Response(serializers.ConferenceUserSerializer(conference_user).data, status=status.HTTP_201_CREATED)


class MyProfessional(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a professional
        if not request.user.conference_user.professional:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        return JsonResponse(serializers.ProfessionalSerializer(request.user.conference_user.professional).data,
                            status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, format=None):
        json_body = request.data

        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)
        if request.user.conference_user.professional:
            professional = request.user.conference_user.professional
        else:
            professional = models.Professional.objects.create()

        role = json_body.get('role')
        try:
            clean_role = models.JobRole.objects.get(pk=role) if (
                role
            ) else models.JobRole.objects.get(pk=models.JobRole.OTHER)
        except:
            clean_role = models.JobRole.objects.get(pk=models.JobRole.OTHER)

        role_other_text = json_body.get('role_other_text')
        clean_role_other_text = role_other_text[:models.JobRole.ROLE_OTHER_TEXT_MAX_LENGTH] if (
            role_other_text and clean_role.pk == models.JobRole.OTHER
        ) else ''

        skills = json_body.get('skills_text')
        clean_skills = skills[:models.SKILLS_MAX_LENGTH] if skills else ''

        traits = json_body.get('traits_text')
        clean_traits = traits[:models.TRAITS_MAX_LENGTH] if traits else ''

        know_most = json_body.get('know_most')
        clean_know_most = know_most[:models.Professional.KNOW_MOST_MAX_LENGTH] if know_most else ''

        relocate = json_body.get('relocate')
        clean_relocate = relocate if relocate else False

        remote = json_body.get('remote')
        if remote is not None:
            clean_local_remote_options = models.LocalRemoteOption.objects.all() if (
                remote
            ) else [models.LocalRemoteOption.objects.get(pk=1)]

        local_remote_options = json_body.get('local_remote_options')
        if local_remote_options is not None:
            clean_local_remote_options = [models.LocalRemoteOption.objects.get(pk=pk) for pk in local_remote_options] if (
              local_remote_options
            ) else [models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.REMOTE)]

        if remote is None and local_remote_options is None:
            clean_local_remote_options = [models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL)]

        country = json_body.get('country')
        clean_country = country[:models.COUNTRY_MAX_LENGTH].upper() if (
            country and
            models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
        ) else ''

        city = json_body.get('city')
        clean_city = city[:models.CITY_MAX_LENGTH] if (
            city and
            models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
        ) else ''

        age = json_body.get('age')
        try:
            clean_age = int(age) if age and 18 <= int(age) <= 120 else None
        except:
            clean_age = None

        experience = json_body.get('experience')
        try:
            clean_experience = int(experience) if experience and 0 <= int(experience) <= 120 else None
        except:
            clean_experience = None

        professional.role = clean_role
        professional.role_other_text = clean_role_other_text
        professional.skills_text = clean_skills
        professional.traits_text = clean_traits
        professional.know_most = clean_know_most
        professional.local_remote_options = clean_local_remote_options
        professional.country = clean_country
        professional.city = clean_city
        professional.relocate = clean_relocate
        professional.age = clean_age
        professional.experience = clean_experience
        professional.is_active = True
        professional.save()
        request.user.conference_user.professional = professional
        request.user.conference_user.save()
        return JsonResponse(serializers.ProfessionalSerializer(professional).data, status=status.HTTP_201_CREATED)


class MyProfessionalDeactivate(APIView):

    @transaction.atomic
    def post(self, request, format=None):
        professional = request.user.conference_user.professional

        # Check if the current user even has a Professional
        if not professional:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        professional.is_active = False
        professional.save()
        return HttpResponse()


class MyProfessionalReactivate(APIView):

    @transaction.atomic
    def post(self, request, format=None):
        professional = request.user.conference_user.professional

        # Check if the current user even has a Professional
        if not professional:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        professional.is_active = True
        professional.save()
        return HttpResponse()


class Professionals(generics.ListAPIView):
    serializer_class = serializers.ProfessionalSerializer

    def get_queryset(self):
        filters = {
            'is_active': True,
        }
        roles = self.request.GET.getlist('role')
        if roles:
            filters['role__in'] = roles
        return models.Professional.objects.filter(**filters).distinct()


class ProfessionalsDefaults(APIView):

    def get(self, request, format=None):
        result = {
            'role': []
        }
        return JsonResponse(result)



class ProfessionalsId(generics.RetrieveAPIView):
    queryset = models.Professional.objects.all()
    serializer_class = serializers.ProfessionalSerializer


class ListCreateUser(APIView):
    permission_classes = (permissions.AllowAny,)

    @transaction.atomic
    def post(self, request, format=None):
        json_body = request.data
        email = json_body.get('email')
        password = json_body.get('password')
        phone = json_body.get('phone')

        # email None or ''
        if not email:
            return Response('email_missing', status=status.HTTP_400_BAD_REQUEST)

        # password None or ''
        if not password:
            return Response('password_missing', status=status.HTTP_400_BAD_REQUEST)

        clean_email = email.lower()

        clean_phone = phone[:models.ConferenceUser.PHONE_MAX_LENGTH] if phone else ''

        if models.User.objects.filter(email=clean_email).exists():
            return Response('email_exists', status=status.HTTP_409_CONFLICT)

        if models.User.objects.filter(username=clean_email).exists():
            return Response('username_exists', status=status.HTTP_409_CONFLICT)

        user = models.User.objects.create(
            email=clean_email,
            first_name='',
            last_name='',
            password=make_password(password),
            username=clean_email,
        )

        conference_user = models.ConferenceUser.objects.get(user=user)
        conference_user.phone = clean_phone
        conference_user.save()

        project_member_queryset = models.ProjectMember.objects.filter(email=clean_email)
        if project_member_queryset.exists():
            project_member = project_member_queryset.get()
            conference_user.project = project_member.project
            conference_user.save()
            project_member.delete()

        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


def users_id(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(models.User, id=pk)
        return JsonResponse({
            'id': user.id,
            'email': user.email,
        }, status=200)
    return HttpResponse(status=405)
