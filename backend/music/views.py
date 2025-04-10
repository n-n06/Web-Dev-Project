from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from music.models import Artist, Album, UserProfile
from music.serializers import ArtistSerializer, AlbumSerializer, UserProfileSerializer


class ArtistListCreateView(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArtistDetailView(APIView):
    def get_object(self, pk):
        try:
            return Artist.objects.get(pk=pk)
        except Artist.DoesNotExist:
            return None

    def get(self, request, pk):
        artist = self.get_object(pk)
        if artist is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ArtistSerializer(artist)
        return Response(serializer.data)

    def put(self, request, pk):
        artist = self.get_object(pk)
        if artist is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ArtistSerializer(artist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        artist = self.get_object(pk)
        if artist is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AlbumListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if isinstance(request.data, list):
            albums = []
            for album_data in request.data:
                serializer = AlbumSerializer(data=album_data, context={'request': request})
                if serializer.is_valid():
                    album = serializer.save()
                    albums.append(album)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            result_serializer = AlbumSerializer(albums, many=True)
            return Response(result_serializer.data, status=status.HTTP_201_CREATED)
        else:
            serializer = AlbumSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                album = serializer.save()
                return Response(AlbumSerializer(album).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AlbumDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            return None

    def get(self, request, pk):
        album = self.get_object(pk)
        if album is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AlbumSerializer(album)
        return Response(serializer.data)

    def put(self, request, pk):
        album = self.get_object(pk)
        if album is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if album.created_by != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = AlbumSerializer(album, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        album = self.get_object(pk)
        if album is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if album.created_by != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        album.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)