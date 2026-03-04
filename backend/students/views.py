from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.throttling import AnonRateThrottle
from .serializers import LoginSerializer, StudentSerializer
from django.contrib.auth import login


class LoginThrottle(AnonRateThrottle):
    rate = '5/minute'


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [LoginThrottle]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user) # Session auth
            
            # Generate or get token
            token, created = Token.objects.get_or_create(user=user)
            
            response_data = {
                "message": "Login successful",
                "token": token.key,
                "is_admin": user.is_staff or user.is_superuser,
                "student": None
            }

            # Get student profile if exists
            try:
                if hasattr(user, 'student_profile'):
                    student = user.student_profile
                    response_data["student"] = StudentSerializer(student).data
            except Exception:
                pass # It's okay if student profile is missing (e.g. for admin)
                
            return Response(response_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            student = request.user.student_profile
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        except Exception:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

from .serializers_admin import AdminStudentSerializer, GradeSerializer
from .models import Student, Grade
from django.shortcuts import get_object_or_404

class AdminStudentListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        students = Student.objects.all().select_related('user').prefetch_related('grades')
        serializer = AdminStudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdminStudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminStudentDetailView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        user = student.user
        student.delete()
        user.delete() # cascading delete of user
        return Response(status=status.HTTP_204_NO_CONTENT)

class AdminGradeView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, student_pk):
        student = get_object_or_404(Student, pk=student_pk)
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=student)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        grade = get_object_or_404(Grade, pk=pk)
        grade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
