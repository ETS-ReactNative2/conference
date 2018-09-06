# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from . import models
from . import serializers


class Jobs(generics.ListAPIView):
    serializer_class = serializers.JobListingSerializer

    def get_queryset(self):
        filters = {}
        if not self.request.GET.get('defaults') == 'true':
            roles = self.request.GET.getlist('role')
            if roles:
                filters['role__in'] = roles
        return models.JobListing.objects.filter(**filters).distinct()


class JobsDefaults(APIView):

    def get(self, request, format=None):
        result = {
            'role': [],
        }
        return JsonResponse(result)


class ListProject(generics.ListAPIView):
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        filters = {}
        excludes = {}
        if not self.request.GET.get('defaults') == 'true':
            funding_stages = self.request.GET.getlist('funding_stage')
            if funding_stages:
                filters['funding_stage__in'] = funding_stages
            giveaways = self.request.GET.getlist('giveaway')
            if giveaways:
                # Projects with giveaway BOTH are always found.
                giveaways.append(models.Giveaway.BOTH)
                filters['giveaway__in'] = giveaways
            product_stages = self.request.GET.getlist('product_stage')
            if product_stages:
                filters['product_stage__in'] = product_stages
            region = self.request.GET.get('region')
            clean_region = int(region) if region else None
            if clean_region == models.Region.ANYWHERE_EXCEPT_UNITED_STATES:
                excludes['legal_country'] = models.Region.COUNTRY_UNITED_STATES
                excludes['main_country'] = models.Region.COUNTRY_UNITED_STATES
            token_types = self.request.GET.getlist('token_type')
            if token_types:
                filters['token_type__in'] = token_types
        return models.Project.objects.filter(**filters).exclude(**excludes).distinct()


class ProjectsDefaults(APIView):

    def get(self, request, format=None):
        result = {
            'funding_stage': [],
            'giveaway': [],
            'product_stage': [],
            'region': models.Region.ANYWHERE,
            'token_type': [],
            'industry': [],
        }
        return JsonResponse(result)


class RetrieveProject(generics.RetrieveAPIView):
    queryset = models.Project.objects.all()
    serializer_class = serializers.ProjectSerializer


class ProjectsIdMembers(APIView):

    @transaction.atomic
    def post(self, request, pk, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Search for project with ID
        queryset = models.Project.objects.filter(pk=pk)
        if not queryset.exists():
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        project = queryset.get()

        # Check if the current user already has a project or project request
        if request.user.conference_user.project:
            return JsonResponse({'code': 'project_existing'}, status=status.HTTP_409_CONFLICT)
        if request.user.conference_user.project_request:
            return JsonResponse({'code': 'project_request_existing'}, status=status.HTTP_409_CONFLICT)

        request.user.conference_user.project_request = project
        return HttpResponse(status=status.HTTP_200_OK)


class MyProject(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        if not request.user.conference_user.project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        return JsonResponse(serializers.ProjectSerializer(request.user.conference_user.project).data,
                            status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, format=None):
        json_body = request.data

        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)
        if request.user.conference_user.project:
            project = request.user.conference_user.project
        else:
            project = models.Project()

        description = json_body.get('description')
        clean_description = description[:models.Project.DESCRIPTION_MAX_LENGTH] if description else ''

        funding_stage = json_body.get('funding_stage')
        clean_funding_stage = models.FundingStage.objects.get(pk=funding_stage) if (
                funding_stage and 1 <= funding_stage <= 3
        ) else None

        fundraising_amount = json_body.get('fundraising_amount')
        clean_fundraising_amount = fundraising_amount if fundraising_amount and fundraising_amount >= 0 else 0

        github = json_body.get('github')
        clean_github = github[:models.Project.GITHUB_MAX_LENGTH] if github else ''

        giveaway = json_body.get('giveaway')
        clean_giveaway = models.Giveaway.objects.get(pk=giveaway) if (
                giveaway and 1 <= giveaway <= 3
        ) else None

        image_url = json_body.get('image_url')
        try:
            clean_image_url = image_url[:models.URL_MAX_LENGTH] if image_url else ''
        except:
            clean_image_url = ''

        industry = json_body.get('industry')
        clean_industry = models.Industry.objects.get(pk=industry) if (
                industry and 1 <= industry <= 41
        ) else models.Industry.objects.get(pk=41)

        is_sponsor = json_body.get('is_sponsor')
        clean_is_sponsor = is_sponsor if isinstance(is_sponsor, bool) else False

        legal_country = json_body.get('legal_country')
        clean_legal_country = legal_country[:models.COUNTRY_MAX_LENGTH].upper() if legal_country else ''

        main_country = json_body.get('main_country')
        clean_main_country = main_country[:models.COUNTRY_MAX_LENGTH].upper() if main_country else ''

        name = json_body.get('name')
        clean_name = name[:models.Project.NAME_MAX_LENGTH] if name else '-'

        news = json_body.get('news')
        try:
            clean_news = news[:models.URL_MAX_LENGTH] if news else ''
        except:
            clean_news = ''

        notable = json_body.get('notable')
        clean_notable = notable[:models.Project.NOTABLE_MAX_LENGTH] if notable else ''

        product_stage = json_body.get('product_stage')
        clean_product_stage = models.ProductStage.objects.get(pk=product_stage) if (
                product_stage and 1 <= product_stage <= 3
        ) else None

        region = json_body.get('region')
        clean_region = models.Region.objects.get(pk=region) if (
            region and 1 <= region <= 4
        ) else None

        region_other_text = json_body.get('region_other_text')
        clean_region_other_text = region_other_text[:models.REGION_OTHER_TEXT_MAX_LENGTH] if (
            region_other_text and clean_region.pk == models.Region.OTHER
        ) else ''

        services_consumed_other_text = json_body.get('services_consumed_other_text')
        clean_services_consumed_other_text =\
            services_consumed_other_text[:models.Project.SERVICES_CONSUMED_OTHER_TEXT_MAX_LENGTH] if (
                services_consumed_other_text
            ) else ''

        services_provided_other_text = json_body.get('services_provided_other_text')
        clean_services_provided_other_text =\
            services_provided_other_text[:models.Project.SERVICES_PROVIDED_OTHER_TEXT_MAX_LENGTH] if (
                services_provided_other_text
            ) else ''

        size = json_body.get('size')
        clean_size = size if size and size >= 0 else 0

        tagline = json_body.get('tagline')
        clean_tagline = tagline[:models.Project.TAGLINE_MAX_LENGTH] if tagline else ''

        telegram = json_body.get('telegram')
        clean_telegram = telegram[:models.Project.TELEGRAM_MAX_LENGTH] if telegram else ''

        token_type = json_body.get('token_type')
        clean_token_type = models.TokenType.objects.get(pk=token_type) if (
                token_type and 1 <= token_type <= 3
        ) else None

        twitter = json_body.get('twitter')
        clean_twitter = twitter[:models.Project.TWITTER_MAX_LENGTH] if twitter else ''

        website = json_body.get('website')
        try:
            clean_website = website[:models.URL_MAX_LENGTH] if website else ''
        except:
            clean_website = ''

        whitepaper = json_body.get('whitepaper')
        try:
            clean_whitepaper = whitepaper[:models.URL_MAX_LENGTH] if whitepaper else ''
        except:
            clean_whitepaper = ''

        project.description = clean_description
        project.funding_stage = clean_funding_stage
        project.fundraising_amount = clean_fundraising_amount
        project.github = clean_github
        project.giveaway = clean_giveaway
        project.image_url = clean_image_url
        project.industry = clean_industry
        project.is_sponsor = clean_is_sponsor
        project.legal_country = clean_legal_country
        project.main_country = clean_main_country
        project.name = clean_name
        project.news = clean_news
        project.notable = clean_notable
        project.product_stage = clean_product_stage
        project.region = clean_region
        project.region_other_text = clean_region_other_text
        project.services_consumed_other_text = clean_services_consumed_other_text
        project.services_provided_other_text = clean_services_provided_other_text
        project.size = clean_size
        project.tagline = clean_tagline
        project.telegram = clean_telegram
        project.token_type = clean_token_type
        project.twitter = clean_twitter
        project.website = clean_website
        project.whitepaper = clean_whitepaper
        project.save()

        request.user.conference_user.project = project
        request.user.conference_user.save()
        return JsonResponse(serializers.ProjectSerializer(project).data, status=status.HTTP_201_CREATED)


class MyProjectJobs(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        result = models.JobListing.objects.filter(project=project)
        return JsonResponse({"jobs": [serializers.JobListingSerializer(job_listing).data for job_listing in result]},
                            status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, format=None):
        body_data = request.data
        body_list = body_data.get('jobs')

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        models.JobListing.objects.filter(project=project).delete()

        result = []

        for json_body in body_list:
            role = json_body.get('role')
            clean_role = models.JobRole.objects.get(pk=role) if (
                role and 1 <= role <= 12
            ) else models.JobRole.objects.get(pk=models.JobRole.OTHER)

            # Check if there already is a job listing for that role
            if models.JobListing.objects.filter(role=clean_role, project=project).exists():
                return JsonResponse({'code': 'role_exists'}, status=status.HTTP_409_CONFLICT)

            role_other_text = json_body.get('role_other_text')
            clean_role_other_text = role_other_text[:models.JobRole.ROLE_OTHER_TEXT_MAX_LENGTH] if (
                role_other_text and clean_role.pk == models.JobRole.OTHER
            ) else ''

            skills = json_body.get('skills_text')
            clean_skills = skills[:models.SKILLS_MAX_LENGTH] if skills else ''

            link = json_body.get('link')
            clean_link = link[:models.URL_MAX_LENGTH] if link else ''

            description = json_body.get('description')
            clean_description = description[:models.JobListing.DESCRIPTION_MAX_LENGTH] if description else ''

            part_time = json_body.get('part_time')
            clean_part_time = part_time if part_time else False

            payments = json_body.get('payments')
            clean_payments = [models.Payment.objects.get(pk=pk) for pk in payments] if payments else []

            local_remote_options = json_body.get('local_remote_options')
            clean_local_remote_options = [models.LocalRemoteOption.objects.get(pk=pk) for pk in local_remote_options] if (
                local_remote_options
            ) else [models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.REMOTE)]

            country = json_body.get('country')
            clean_country = country[:models.COUNTRY_MAX_LENGTH] if (
                    country and
                    models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
            ) else ''

            city = json_body.get('city')
            clean_city = city[:models.CITY_MAX_LENGTH] if (
                    city and
                    models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
            ) else ''

            job_listing = models.JobListing.objects.create(
                role=clean_role,
                role_other_text=clean_role_other_text,
                skills_text=clean_skills,
                link=clean_link,
                description=clean_description,
                part_time=clean_part_time,
                country=clean_country,
                city=clean_city,
                project=project,
            )
            job_listing.payments = clean_payments
            job_listing.local_remote_options = clean_local_remote_options
            job_listing.save()
            result.append(job_listing)

        return JsonResponse({"jobs": [serializers.JobListingSerializer(job_listing).data for job_listing in result]},
                            status=status.HTTP_201_CREATED)


class MyProjectJobsId(APIView):

    @transaction.atomic
    def delete(self, request, pk, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        # Search for job listing with ID
        queryset = models.JobListing.objects.filter(pk=pk)
        if not queryset.exists():
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        job_listing = queryset.get()

        # Check if the job listing has the same project as the current user
        if not job_listing.project == project:
            return JsonResponse({'code': 'user_has_different_project'}, status=status.HTTP_400_BAD_REQUEST)

        # Delete the job listing
        job_listing.delete()
        return HttpResponse(status=status.HTTP_200_OK)

    @transaction.atomic
    def get(self, request, pk, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        # Search for job listing with ID
        queryset = models.JobListing.objects.filter(pk=pk)
        if not queryset.exists():
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        job_listing = queryset.get()

        # Check if the job listing has the same project as the current user
        if not job_listing.project == project:
            return JsonResponse({'code': 'user_has_different_project'}, status=status.HTTP_400_BAD_REQUEST)

        # Return the job listing
        return JsonResponse(serializers.JobListingSerializer(job_listing).data, status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, pk, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        # Search for job listing with ID
        queryset = models.JobListing.objects.filter(pk=pk)
        if not queryset.exists():
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        job_listing = queryset.get()

        # Check if the job listing has the same project as the current user
        if not job_listing.project == project:
            return JsonResponse({'code': 'user_has_different_project'}, status=status.HTTP_400_BAD_REQUEST)

        # Override the job listing
        json_body = request.data

        role = json_body.get('role')
        clean_role = models.JobRole.objects.get(pk=role) if (
                role and 1 <= role <= 12
        ) else models.JobRole.objects.get(pk=models.JobRole.OTHER)

        # Prevent role changes
        if not job_listing.role == clean_role:
            return JsonResponse({'code': 'role_changes'}, status=status.HTTP_400_BAD_REQUEST)

        role_other_text = json_body.get('role_other_text')
        clean_role_other_text = role_other_text[:models.JobRole.ROLE_OTHER_TEXT_MAX_LENGTH] if (
                role_other_text and clean_role.pk == models.JobRole.OTHER
        ) else ''

        skills = json_body.get('skills')
        clean_skills = skills[:models.SKILLS_MAX_LENGTH] if skills else ''

        link = json_body.get('link')
        clean_link = link[:models.URL_MAX_LENGTH] if link else ''

        description = json_body.get('description')
        clean_description = description[:models.JobListing.DESCRIPTION_MAX_LENGTH] if description else ''

        part_time = json_body.get('part_time')
        clean_part_time = part_time if part_time else False

        payments = json_body.get('payments')
        clean_payments = [models.Payment.objects.get(pk) for pk in payments] if payments else []

        local_remote_options = json_body.get('local_remote_options')
        clean_local_remote_options = [models.LocalRemoteOption.objects.get(pk=pk) for pk in local_remote_options] if (
            local_remote_options
        ) else [models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.REMOTE)]

        country = json_body.get('country')
        clean_country = country[:models.COUNTRY_MAX_LENGTH] if (
                country and
                models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
        ) else ''

        city = json_body.get('city')
        clean_city = city[:models.CITY_MAX_LENGTH] if (
                city and
                models.LocalRemoteOption.objects.get(pk=models.LocalRemoteOption.LOCAL) in clean_local_remote_options
        ) else ''

        job_listing.role_other_text = clean_role_other_text
        job_listing.link = clean_link
        job_listing.description = clean_description
        job_listing.part_time = clean_part_time
        job_listing.country = clean_country
        job_listing.city = clean_city
        job_listing.skills_text = clean_skills
        job_listing.payments = clean_payments
        job_listing.local_remote_options = clean_local_remote_options
        job_listing.save()
        return JsonResponse(serializers.JobListingSerializer(job_listing).data, status=status.HTTP_200_OK)


class MyProjectLeave(APIView):

    @transaction.atomic
    def post(self, request, format=None):
        # Check if the current user even has a project
        conference_user = request.user.conference_user
        if not conference_user.project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        # Remove the user from the project
        conference_user.project = None
        conference_user.project_request = None
        conference_user.save()
        return HttpResponse(status=status.HTTP_200_OK)


class MyProjectMembers(APIView):

    @transaction.atomic
    def get(self, request, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        if not request.user.conference_user.project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        result = {
            'members': [
                {'id': member.user.id, 'first_name': member.first_name, 'last_name': member.last_name}
                for member in request.user.conference_user.project.members.all().exclude(user=request.user)
            ],
            'member_requests': [
                {'id': member.user.id, 'first_name': member.first_name, 'last_name': member.last_name}
                for member in [request.user.conference_user]
            ]
        }
        return JsonResponse(result, status=status.HTTP_200_OK)

    @transaction.atomic
    def post(self, request, format=None):
        json_body = request.data

        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status.HTTP_404_NOT_FOUND)

        # Check email
        email = json_body.get('email')
        if not email:
            return JsonResponse({'code': 'email_missing'}, status=status.HTTP_400_BAD_REQUEST)

        # Search for user with that email
        queryset = models.User.objects.filter(email=email)
        if not queryset.exists():
            return JsonResponse({'code': 'no_user_with_email'}, status=status.HTTP_400_BAD_REQUEST)
        user = queryset.get()

        # Check if the target user has a conference_user
        if not models.ConferenceUser.objects.filter(user=user).exists():
            models.ConferenceUser.objects.create(user=user)

        # Check if the target user already has a project or project request
        if user.conference_user.project:
            return JsonResponse({'code': 'user_has_project'}, status=status.HTTP_400_BAD_REQUEST)
        if user.conference_user.project_request:
            return JsonResponse({'code': 'user_has_project_request'}, status=status.HTTP_400_BAD_REQUEST)

        # Assign the target user to the project
        user.conference_user.project = project
        user.conference_user.save()

        result = {
            'members': [
                {'id': member.user.id, 'first_name': member.first_name, 'last_name': member.last_name}
                for member in request.user.conference_user.project.members.all()
            ],
            'member_requests': [
                {'id': member.user.id, 'first_name': member.first_name, 'last_name': member.last_name}
                for member in request.user.conference_user.project.member_requests.all()
            ]
        }
        return JsonResponse(result, status=status.HTTP_200_OK)


class MyProjectMembersId(APIView):

    @transaction.atomic
    def delete(self, request, pk, format=None):
        if not models.ConferenceUser.objects.filter(user=self.request.user).exists():
            models.ConferenceUser.objects.create(user=self.request.user)

        # Check if the current user even has a project
        project = request.user.conference_user.project
        if not project:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

        # Search for user with ID
        queryset = models.User.objects.filter(pk=pk)
        if not queryset.exists():
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        user = queryset.get()

        # Check if the target user has a conference_user
        if not models.ConferenceUser.objects.filter(user=user).exists():
            models.ConferenceUser.objects.create(user=user)

        # Check if the target user has the same project or project request as the current user
        if not user.conference_user.project == project and not user.conference_user.project_request == project:
            return JsonResponse({'code': 'user_has_different_project'}, status=status.HTTP_400_BAD_REQUEST)

        # Remove the target user from the project
        user.conference_user.project = None
        user.conference_user.project_request = None
        user.conference_user.save()
        return HttpResponse(status=status.HTTP_200_OK)
