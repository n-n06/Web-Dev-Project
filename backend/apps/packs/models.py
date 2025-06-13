from django.db import models

# from apps.albums.models import Album
from django.utils.text import slugify
from apps.users.models import UserProfile
from django.contrib.auth.models import User

# Create your models here.
class AlbumPack(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    creator = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='album_packs',
    )
    # just for testing purposes
    albums = models.JSONField(default=list)

    def save(self, *args, **kwargs):
        # if not self.slug:
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)
