from django.db import models

class Feature(models.Model):
    title = models.CharField(max_length=255)
    icon_name = models.CharField(max_length=100, help_text="Lucide React icon name")

    def __str__(self):
        return self.title

class Module(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    coming_soon_label = models.CharField(max_length=255, blank=True, null=True, help_text="Label for 'Coming Soon' badge")

    def __str__(self):
        return self.title
