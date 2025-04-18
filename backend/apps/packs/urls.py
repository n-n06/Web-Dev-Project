from django.urls import path
from . import views

urlpatterns = [
    path('', views.album_packs_list),
    path('<int:album_pack_id>/', views.album_pack_detail),
]