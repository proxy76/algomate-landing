from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from students.models import Student

class Command(BaseCommand):
    help = 'Creates a mock student for testing'

    def handle(self, *args, **kwargs):
        student_id = "M12345"
        password = "password123"
        first_name = "Tech"
        last_name = "Student"
        email = "student@algomate.ro"
        group_id = "11600" # Monday 16:00
        phone = "0712345678"

        # Check if user exists
        if User.objects.filter(username=student_id).exists():
            self.stdout.write(self.style.WARNING(f'User {student_id} already exists.'))
            return

        # Create User
        user = User.objects.create_user(
            username=student_id,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # Create Student Profile
        Student.objects.create(
            user=user,
            student_id=student_id,
            group_id=group_id,
            phone=phone
        )

        self.stdout.write(self.style.SUCCESS(f'Successfully created mock student:'))
        self.stdout.write(f'  ID (Username): {student_id}')
        self.stdout.write(f'  Password: {password}')
        self.stdout.write(f'  Group: {group_id}')
