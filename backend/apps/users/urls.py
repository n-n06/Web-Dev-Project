from django.urls import path
from .views import (
    ChangePasswordView, public_user_list_view, private_user_profile_view, public_user_profile_view
)

urlpatterns = [
    path('', public_user_list_view, name='public_user_list'),
    path('<int:user_id>/', public_user_profile_view, name='public_user_profile'),
    path('me/', private_user_profile_view, name='private_user_profile'),
    path('me/change-password/', ChangePasswordView.as_view(), name='change-password'),
]