from apps.albums.models import Album
from rest_framework import serializers
from .models import AlbumPack

class AlbumPackSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AlbumPack
        fields = '__all__'