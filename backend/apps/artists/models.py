from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    spotify_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    spotify_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name