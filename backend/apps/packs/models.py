from django.db import models

# from apps.albums.models import Album

# Create your models here.
class AlbumPack(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    # description = models.TextField()
    # creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='album_packs')
    # albums = models.ManyToManyField(Album, related_name='album_packs')
    # likes = models.PositiveIntegerField(default=0)
    # created_at = models.DateTimeField(auto_now_add=True)


    # just for testing purposes
    albums = models.JSONField(default=list)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)