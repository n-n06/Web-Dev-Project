from django.db import models

from apps.artists.models import Artist

class Genre(models.Model):
    # will use getTopTags
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self.name

class Album(models.Model):
    spotify_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    artists = models.ManyToManyField(Artist, related_name='albums')
    album_name = models.CharField(max_length=512)
    # genre = models.ManyToManyField(Genre, related_name='albums')
    image_url = models.URLField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.artist} - {self.album_name}"
# Create your models here.
