from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from django.conf import settings

# from music.serializers import ArtistSerializer, AlbumSerializer, UserProfileSerializer
#
#
# class ArtistListCreateView(APIView):
#     def get(self, request):
#         artists = Artist.objects.all()
#         serializer = ArtistSerializer(artists, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = ArtistSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# class ArtistDetailView(APIView):
#     def get_object(self, pk):
#         try:
#             return Artist.objects.get(pk=pk)
#         except Artist.DoesNotExist:
#             return None
#
#     def get(self, request, pk):
#         artist = self.get_object(pk)
#         if artist is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = ArtistSerializer(artist)
#         return Response(serializer.data)
#
#     def put(self, request, pk):
#         artist = self.get_object(pk)
#         if artist is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         serializer = ArtistSerializer(artist, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk):
#         artist = self.get_object(pk)
#         if artist is None:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         artist.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#
