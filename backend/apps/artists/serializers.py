from rest_framework import serializers

from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['name', 'spotify_id', 'spotify_url']