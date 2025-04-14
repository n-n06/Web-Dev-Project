from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.albums.services.external_api_service import ExternalAPIService

# Create your views here.
class AlbumSearchAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        query = request.query_params.get("q")
        if not query:
            return Response({"error": "Missing search query"}, status=status.HTTP_400_BAD_REQUEST)

        results = ExternalAPIService.search(query)
        response = []

        for album in results['results']['albummatches']['album']:
            album_name = album['name']
            artist = album['artist']
            image = album['image'][2]['#text']

            response.append({
                'album_name': album_name,
                'artist': artist,
                'image': image,
            })


        return Response(response, status=status.HTTP_200_OK)