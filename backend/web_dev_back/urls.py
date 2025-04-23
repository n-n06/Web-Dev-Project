from django.contrib import admin
from django.urls import path, include

from apps.users.views import PrivateUserProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('music.urls')),
    path('api/private/', PrivateUserProfileView.as_view(), name='private-user-profile'),
]