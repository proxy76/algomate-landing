from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Student, Grade
import random
import string

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'subject', 'grade', 'date', 'description']

class AdminStudentSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    student_id = serializers.CharField(write_only=True)
    program = serializers.ChoiceField(choices=Student.PROGRAM_CHOICES, write_only=True)
    day = serializers.IntegerField(write_only=True, min_value=1, max_value=7) # 1=Monday
    time = serializers.TimeField(write_only=True, format='%H:%M')
    
    # Read-only fields to return
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    grades = GradeSerializer(many=True, read_only=True)
    current_student_id = serializers.CharField(source='student_id', read_only=True)
    current_program = serializers.CharField(source='program', read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'student_id', 'program', 'group_id', 'phone', 'first_name', 'last_name', 'email', 'password', 'day', 'time', 'user_id', 'full_name', 'grades', 'current_student_id', 'current_program']
        read_only_fields = ['group_id']

    def create(self, validated_data):
        # Extract user data
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        student_id = validated_data.pop('student_id')
        program = validated_data.pop('program')
        day = validated_data.pop('day')
        time = validated_data.pop('time')
        
        # 1. Generate unique Group ID (Day + Time, e.g., 11600)
        # Format time as HHMM (e.g., 16:00 -> 1600)
        time_str = time.strftime('%H%M')
        group_id = f"{day}{time_str}"

        # 2. Check if student ID exists (although unique constraint handles this, good for validation msg)
        if Student.objects.filter(student_id=student_id).exists():
             raise serializers.ValidationError({"student_id": "Acest ID există deja."})

        # 3. Create User
        username = student_id 
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"student_id": "Acest nume de utilizator există deja."})

        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)

        # 4. Create Student
        student = Student.objects.create(
            user=user,
            student_id=student_id,
            group_id=group_id,
            program=program,
            phone=validated_data.get('phone', '')
        )
        
        return student
