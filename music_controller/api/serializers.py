from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room #This tells the ModelSerializer that it will be serializing/deserializing instances of the Room model.
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at') # This tells the ModelSerializer that these are the fields of the Room model you want to include in the serialized output (when converting from a Django Room object to JSON) and in the deserialized input (when converting from JSON to a Django Room object).


class CreateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=False)
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'code', 'votes_to_skip', 'created_at')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'code', 'votes_to_skip', 'created_at')