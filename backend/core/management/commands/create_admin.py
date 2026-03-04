from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Create a superuser'

    def handle(self, *args, **options):
        username = 'admin'
        email = 'admin@example.com'
        password = 'admin'

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully! Password: "{password}"'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
