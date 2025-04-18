from django.contrib.auth.models import User
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True,
         error_messages={
            'required': 'Please confirm your password.'
    })

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'error_messages': {
                    'required': 'Password is required.',
                    'min_length': 'Password must be at least 8 characters.'
                }
            },
            'email' : {
                'required' : True,
                'error_messages': {
                    'required': 'Email is required.',
                    'invalid': 'Please enter a valid email address.'
                }
            },
            'username': {
                'error_messages': {
                    'required': 'Username is required.',
                    'unique': 'This username is already taken.'
                }
            }
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                'password2': 'Passwords do not match.'
            })
        return data
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, valid_data):
        valid_data.pop('password2')
        user = User.objects.create_user(**valid_data)
        return user
