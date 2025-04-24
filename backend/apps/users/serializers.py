from rest_framework import serializers
from django.contrib.auth.models import User

from apps.packs.serializers import AlbumPackSerializer
from apps.users.models import UserProfile


class PublicProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True, source='user.username')
    profile_image_url = serializers.SerializerMethodField()
    album_packs = AlbumPackSerializer(many=True, read_only=True)

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_image and hasattr(obj.profile_image, 'url'):
            return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url
        return ''

class PrivateProfileSerializer(serializers.ModelSerializer):
    album_packs = AlbumPackSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'profile_image', 'album_packs']


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

        if 'profile_image' in profile_data:
            profile_instance.profile_image = profile_data['profile_image']
        profile_instance.save()
        return instance