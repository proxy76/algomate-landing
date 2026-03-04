from django.urls import path
from .views import (
    LoginAPIView, 
    StudentProfileView,
    AdminStudentListView,
    AdminStudentDetailView,
    AdminGradeView
)

urlpatterns = [
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('profile/', StudentProfileView.as_view(), name='profile'),
    
    # Admin URLs
    path('admin/students/', AdminStudentListView.as_view(), name='admin-student-list'),
    path('admin/students/<int:pk>/', AdminStudentDetailView.as_view(), name='admin-student-detail'),
    path('admin/students/<int:student_pk>/grades/', AdminGradeView.as_view(), name='admin-grade-create'),
    path('admin/grades/<int:pk>/', AdminGradeView.as_view(), name='admin-grade-delete'),
]
