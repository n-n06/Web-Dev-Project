from django.contrib.auth.models import User
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True},
                        'email' : {'required' : True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Passwords must match')
        return data

    def create(self, valid_data):
        valid_data.pop('password2')
        user = User.objects.create_user(**valid_data)
        return user
