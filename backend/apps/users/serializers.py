from rest_framework import serializers
from django.contrib.auth.models import User

from apps.packs.serializers import AlbumPackSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PublicProfileSerializer(serializers.ModelSerializer):
    album_packs = AlbumPackSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'album_packs']