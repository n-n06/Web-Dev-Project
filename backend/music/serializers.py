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
# class TrackSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Track
#         fields = ['id', 'title', 'track_number', 'duration']
#
#
# class AlbumSerializer(serializers.ModelSerializer):
#     artist = serializers.CharField(source='artist.name')
#     album_name = serializers.CharField(source='title', write_only=True)
#     image = serializers.CharField(source='cover_image')
#     tracks = serializers.ListField(
#         child=serializers.CharField(),
#         write_only=True,
#         required=False
#     )
#
#     class Meta:
#         model = Album
#         fields = ['id', 'album_name', 'artist', 'image', 'release_year', 'tracks']
#         read_only_fields = ['id']
#
#     def create(self, validated_data):
#         # Handle artist
#         artist_name = validated_data.pop('artist')['name']
#         artist, _ = Artist.objects.get_or_create(name=artist_name)
#
#         tracks_data = validated_data.pop('tracks', [])
#
#         validated_data['title'] = validated_data.pop('title')  # from album_names
#         validated_data['cover_image'] = validated_data.pop('cover_image')  # from image
#
#         album = Album.objects.create(
#             artist=artist,
#             created_by=self.context['request'].user,
#             **validated_data
#         )
#
#         Track.objects.bulk_create([
#             Track(
#                 album=album,
#                 title=track_name,
#                 track_number=i + 1
#             ) for i, track_name in enumerate(tracks_data)
#         ])
#
#         return album
#     def validate_release_year(self, value):
#         if value < 1900 or value > 2100:
#             raise serializers.ValidationError("Release year must be between 1900 and 2100")
#         return value
#
# class UserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     favorite_artists = ArtistSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = UserProfile
#         fields = ['id', 'user', 'bio', 'profile_picture', 'favorite_artists',
#                  'created_at', 'updated_at']