from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializers import PublicProfileSerializer, UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_user_list_view(request):
    current_user = request.user
    other_users = (User.objects.exclude(id=current_user.id)
                   .prefetch_related('profile__album_packs'))

    public_profile_data = []
    for user in other_users:
        ser = PublicProfileSerializer(user.profile)
        public_profile_data.append(ser.data)

    return Response(public_profile_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_user_profile_view(request, user_id):
    try:
        user = get_object_or_404(User, id=user_id)
        ser = PublicProfileSerializer(user.profile)
        return Response(ser.data, status=status.HTTP_200_OK)
    except:
        return Response({
            "detail" : "User Profile Not Found",
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def private_user_profile_view(request):
    user = request.user
    if request.method == 'PATCH':
        ser = UserSerializer(user, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_200_OK)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        ser = UserSerializer(user)
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