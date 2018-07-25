from rest_framework import serializers
from . import models


class SlotKindSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SlotKind
        fields = (
            'label',
        )


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Speaker
        fields = (
            'name',
        )


class PresentationSerializer(serializers.ModelSerializer):
    speaker = SpeakerSerializer()
    additional_speakers = SpeakerSerializer(many=True)

    class Meta:
        model = models.Presentation
        fields = (
            'pk',
            'title',
            'speaker',
            'additional_speakers'
        )


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = (
            'name',
        )


class SlotSerializer(serializers.ModelSerializer):
    kind = SlotKindSerializer()
    rooms = RoomSerializer(many=True)
    content = PresentationSerializer()
    rowspan = serializers.SerializerMethodField('special_rowspan')
    colspan = serializers.SerializerMethodField('special_colspan')

    def special_rowspan(self, slot):
        return slot.rowspan

    def special_colspan(self, slot):
        return slot.colspan

    class Meta:
        model = models.Slot
        fields = (
            'name',
            'kind',
            'start',
            'end',
            'rooms',
            'content',
            'content_override',
            'content_override_html',
            'rowspan',
            'colspan',
        )
