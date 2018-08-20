# -*- coding: utf-8 -*-
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import parsers, renderers, serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import APIException, six, _force_text_recursive
from rest_framework.response import Response
from rest_framework.views import APIView


class ValidationError401(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED

    def __init__(self, detail):
        # For validation errors the 'detail' key is always required.
        # The details should always be coerced to a list if not already.
        if not isinstance(detail, dict) and not isinstance(detail, list):
            detail = [detail]
        self.detail = _force_text_recursive(detail)

    def __str__(self):
        return six.text_type(self.detail)


class AuthTokenSerializer(serializers.Serializer):
    """
    Changes the Django Rest Framework version of AuthTokenSerializer to use HTTP 401 for invalid credentials.
    """

    username = serializers.CharField(label=_("Username"))
    password = serializers.CharField(label=_("Password"), style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg)
            else:
                msg = _('Unable to log in with provided credentials.')
                raise ValidationError401(msg)
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg)

        attrs['user'] = user
        return attrs


class ObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


obtain_auth_token = ObtainAuthToken.as_view()
