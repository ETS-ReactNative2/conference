from __future__ import unicode_literals
from django import forms

from symposion.speakers.models import Speaker


class SpeakerForm(forms.ModelForm):

    class Meta:
        model = Speaker
        fields = [
            "name",
            "biography",
            "photo",
            "phone_number",
            "twitter_username",
            "github_username",
            "country",
            "region",
            "city",
            "secondary_contact"
        ]

    def clean_twitter_username(self):
        value = self.cleaned_data["twitter_username"]
        if value.startswith("@"):
            value = value[1:]
        return value
