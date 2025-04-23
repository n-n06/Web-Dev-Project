from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from apps.albums.services.external_api_service import ExternalAPIService

from .models import Album
from .serializers import AlbumSerializer
from apps.artists.models import Artist

class AlbumSearchAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        query = request.query_params.get("q")
        if not query:
            return Response({"error": "Missing search query"}, status=status.HTTP_400_BAD_REQUEST)

        results = ExternalAPIService.search(query, 'spotify')
        response_data = []

        for album_data in results['albums']['items']:
            spotify_album_id = album_data.get('id')
            album_name = album_data.get('name')
            release_date_str = album_data.get('release_date')
            artists_data = album_data.get('artists', [])
            images_data = album_data.get('images', [])

            if not spotify_album_id:
                continue

            try:
                album = Album.objects.get(spotify_id=spotify_album_id)
            except Album.DoesNotExist:
                album = Album(
                    album_name=album_name,
                    spotify_id=spotify_album_id,
                    image_url=images_data[0]['url'] if images_data else None,
                    release_date=self.parse_release_date(release_date_str)
                )
                album.save()
                
                for artist_data in artists_data:
                    artist_id = artist_data.get('id')
                    artist_name = artist_data.get('name')
                    artist_spotify_url = artist_data.get('external_urls', {}).get('spotify')

                    if artist_id:
                        artist, created = Artist.objects.get_or_create(
                            spotify_id=artist_id,
                            defaults={'name': artist_name, 'spotify_url': artist_spotify_url}
                        )
                        album.artists.add(artist)

            response_data.append({
                'spotify_id' : album.spotify_id,
                'album_name': album.album_name,
                'artists': album.artists.values('name', 'spotify_id', 'spotify_url'),
                'image_url': album.image_url,
                'release_date' : album.release_date
            })

        return Response(response_data, status=status.HTTP_200_OK)

    def parse_release_date(self, date_str):
        if not date_str:
            return None
        formats = ('%Y-%m-%d', '%Y-%m', '%Y')
        for fmt in formats:
            try:
                return timezone.datetime.strptime(date_str, fmt).date()
            except (ValueError, TypeError):
                continue
        return None
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def album_detail_view(req, spotify_id):
    album = get_object_or_404(Album, spotify_id=spotify_id)
    serializer = AlbumSerializer(album)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def album_list_view(req):
    albums = Album.objects.all()
    serializer = AlbumSerializer(albums, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)