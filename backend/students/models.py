from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    # Custom ID: First char (M/P/B) + 5 digit unique number (e.g., M12345)
    student_id = models.CharField(max_length=6, unique=True) 
    # Group ID: Day (1-7) + Time (e.g., 11600 for Monday 16:00)
    group_id = models.CharField(max_length=10)
    phone = models.CharField(max_length=20, blank=True)
    
    PROGRAM_CHOICES = [
        ('Matematica', 'Matematica'),
        ('Informatica', 'Informatica'),
    ]
    program = models.CharField(max_length=20, choices=PROGRAM_CHOICES, default='Matematica')

    def __str__(self):
        return f"{self.student_id} - {self.user.get_full_name()}"

class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.CharField(max_length=50) # 'Matematica', 'Informatica'
    grade = models.FloatField()
    date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.subject}: {self.grade}"
