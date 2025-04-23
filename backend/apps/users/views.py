from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PublicProfileSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class PublicUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        other_users = User.objects.exclude(id=current_user.id)  
        serializer = PublicProfileSerializer(other_users, many=True)
        return Response(serializer.data)

class PublicUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)
            serializer = PublicProfileSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=404)