from rest_framework import serializers
# from music.models import Artist, Album, Track, UserProfile
from django.contrib.auth.models import User


#
# class ArtistSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(max_length=100)
#     bio = serializers.CharField(allow_null=True, required=False)
#     created_at = serializers.DateTimeField(read_only=True)
#     updated_at = serializers.DateTimeField(read_only=True)
#
#     def create(self, validated_data):
#         return Artist.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.bio = validated_data.get('bio', instance.bio)
#         instance.save()
#         return instance
#