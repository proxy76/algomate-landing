from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Student

class LoginSerializer(serializers.Serializer):
    student_id = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        student_id = data.get('student_id')
        password = data.get('password')

        if student_id and password:
            user = None
            
            # 1. Try to find the user via Student profile
            try:
                student = Student.objects.get(student_id=student_id)
                user = authenticate(username=student.user.username, password=password)
            except Student.DoesNotExist:
                # 2. Fallback: try to authenticate assuming username == student_id
                user = authenticate(username=student_id, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("Contul este dezactivat.")
                return {'user': user}
            else:
                raise serializers.ValidationError("ID Elev sau parolă incorectă.")
        else:
            raise serializers.ValidationError("Trebuie să introduceți ID-ul și parola.")

class StudentSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Student
        fields = ['student_id', 'group_id', 'phone', 'first_name', 'last_name', 'email']
