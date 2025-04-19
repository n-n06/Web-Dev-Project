from apps.albums.models import Album
from rest_framework import serializers
from .models import AlbumPack

class AlbumPackSerializer(serializers.ModelSerializer):
    # albums = serializers.PrimaryKeyRelatedField(
    #     queryset=Album.objects.all(),
    #     many=True
    # )
    
    class Meta:
        model = AlbumPack
        fields = '__all__'