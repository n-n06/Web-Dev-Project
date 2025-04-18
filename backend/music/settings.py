INSTALLED_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'profiles',
]

# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework.authentication.TokenAuthentication',
#     ],
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.IsAuthenticated',
#     ],
# }

AUTH_USER_MODEL = 'auth.User'