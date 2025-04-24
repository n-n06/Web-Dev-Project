from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import AlbumPack
from .serializers import AlbumPackSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def album_packs_list(request, user_id=None):
    if request.method == 'GET':
        if user_id:
            user = get_object_or_404(User, pk=user_id)
            album_packs = user.profile.album_packs.all()
        elif request.user.is_authenticated:
            album_packs = request.user.profile.album_packs.all()
        else:
            album_packs = AlbumPack.objects.all()

        serializer = AlbumPackSerializer(album_packs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required to create album packs."},
                            status=status.HTTP_401_UNAUTHORIZED)
        try:
            data = json.loads(request.body)
            data.pop('creator', None)
            data['creator'] = request.user.profile.id
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AlbumPackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def album_pack_detail(request, album_pack_id=None):
    album_pack = get_object_or_404(AlbumPack, pk=album_pack_id)


    if request.method == 'GET':
        serializer = AlbumPackSerializer(album_pack)
        return JsonResponse(serializer.data, status=200)

    elif request.method in ['PUT', 'PATCH']:
        if album_pack.creator.user != request.user:
            return JsonResponse({'error': 'Unauthorized: You do not have permission to modify this album pack.'},
                                status=403)

        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AlbumPackSerializer(instance=album_pack, data=data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200) #Changed from 201 to 200
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        album_pack.delete()
        return JsonResponse({'message': 'Album pack deleted'}, status=204)
