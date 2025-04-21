from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from .models import AlbumPack
from .serializers import AlbumPackSerializer

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def album_packs_list(request):
    if request.method == 'GET':
        album_packs = AlbumPack.objects.all()
        serializer = AlbumPackSerializer(album_packs, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = AlbumPackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def album_pack_detail(request, album_pack_id=None):
    try:
        album_pack = AlbumPack.objects.get(pk=album_pack_id)
    except AlbumPack.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=404)

    if request.method == 'GET':
        serializer = AlbumPackSerializer(album_pack)
        return JsonResponse(serializer.data, status=200)

    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = AlbumPackSerializer(instance=album_pack, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
    elif request.method == 'PATCH':
        data = json.loads(request.body)  
        serializer = AlbumPackSerializer(instance=album_pack, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        album_pack.delete()
        return JsonResponse({'message': 'Album pack deleted'}, status=204)