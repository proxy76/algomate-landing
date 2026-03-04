from rest_framework import serializers
from .models import Module, Feature

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=50) # Required by default
    message = serializers.CharField()
    tutoring_types = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=True, # Allow empty if user selected none (optional logic, but visually implies choice)
        required=False
    )
    is_robot_verified = serializers.BooleanField()

    def validate_is_robot_verified(self, value):
        if not value:
            raise serializers.ValidationError("Robot verification failed.")
        return value
