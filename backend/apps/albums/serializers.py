from rest_framework import serializers

from .models import Album
from apps.artists.serializers import ArtistSerializer

class AlbumSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['spotify_id', 'name', 'release_date', 'image_url', 'artists']
        read_only_fields = ['spotify_id'] # Prevent modification of the unique Spotify ID