from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from apps.users.models import UserProfile


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=150,
        error_messages={
            'required': 'Username is required.',
            'blank': 'Username cannot be blank.'
        }
    )
    email = serializers.EmailField(
        max_length=254,
        error_messages={
            'required': 'Email is required.',
            'blank': 'Email cannot be blank.',
            'invalid': 'Please enter a valid email address.'
        }
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True,
        min_length=8,
        error_messages={
            'required': 'Password is required.',
            'blank': 'Password cannot be blank.',
            'min_length': 'Password must be at least 8 characters.'
        }
    )
    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True,
        error_messages={
            'required': 'Please confirm your password.',
            'blank': 'Please confirm your password.'
        }
    )

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': 'Passwords do not match.'})
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.password = make_password(password)
        user.save()
        UserProfile.objects.create(user=user)
        return user