from django.urls import path
from .views import PublicUserListView, PublicUserProfileView  

urlpatterns = [
    path('', PublicUserListView.as_view(), name='public_user_list'),
    path('<int:user_id>/', PublicUserProfileView.as_view(), name='public_user_profile'),
]