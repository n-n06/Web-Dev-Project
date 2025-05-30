from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import UserProfile
from .serializers import PublicProfileSerializer, UserSerializer

from rest_framework.views import APIView

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_user_list_view(request):
    current_user = request.user
    other_users = (User.objects.exclude(id=current_user.id)
                   .prefetch_related('profile__album_packs'))

    serializer = UserSerializer(other_users, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_user_profile_view(request, user_id):
    user = get_object_or_404(User.objects.prefetch_related('profile__album_packs'), id=user_id)
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def private_user_profile_view(request):
    user = request.user

    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        UserProfile.objects.create(user=user, profile_image=None)

    if request.method == 'PATCH':
        ser = UserSerializer(user, data=request.data, partial=True)
        print(request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_200_OK)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        ser = UserSerializer(user, context={'request': request})
        return Response(ser.data, status=status.HTTP_200_OK)


# class PublicUserListView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         current_user = request.user
#         other_users = User.objects.exclude(id=current_user.id)
#         serializer = PublicProfileSerializer(other_users, many=True)
#         return Response(serializer.data)
#
# class PublicUserProfileView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, user_id):
#         try:
#             user = User.objects.get(pk=user_id)
#             serializer = PublicProfileSerializer(user)
#             return Response(serializer.data)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=404)
#
# class PrivateUserProfileView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     # def put(self, request):
#     #     user = request.user
#     #     serializer = UserSerializer(user, data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data)
#     #     return Response(serializer.errors, status=400)
#
#     def patch(self, request):
#         user = request.user
#         serializer = UserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)
#
#     def get(self, request):
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response(serializer.data)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not current_password or not new_password:
            return Response({'error': 'Both fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)