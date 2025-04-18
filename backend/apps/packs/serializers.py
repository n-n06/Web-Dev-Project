from rest_framework import serializers
from .models import AlbumPack

class AlbumPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumPack
        fields = '__all__'