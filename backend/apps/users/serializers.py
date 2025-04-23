from rest_framework import serializers
from django.contrib.auth.models import User

from apps.packs.serializers import AlbumPackSerializer
from apps.users.models import UserProfile


class PublicProfileSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True, source='user.username')
    profile_image_url = serializers.URLField(allow_blank=True, required=False)
    album_packs = AlbumPackSerializer(many=True, read_only=True)

class PrivateProfileSerializer(serializers.ModelSerializer):
    album_packs = AlbumPackSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['profile_image_url', 'album_packs']


class UserSerializer(serializers.ModelSerializer):
    profile = PrivateProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile_instance = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile_instance.profile_image_url = profile_data.get('profile_image_url', profile_instance.profile_image_url)
        profile_instance.save()

        return instance
