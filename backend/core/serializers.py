from rest_framework import serializers


ALLOWED_TUTORING_TYPES = {"Matematică BAC", "Informatică BAC"}


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120, trim_whitespace=True)
    email = serializers.EmailField(max_length=200)
    phone = serializers.CharField(max_length=30, trim_whitespace=True)
    message = serializers.CharField(max_length=2000, trim_whitespace=True)
    tutoring_types = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True,
        required=False,
        max_length=5,
    )
    is_robot_verified = serializers.BooleanField()

    # Honeypot: must be empty. Bots tend to fill every field.
    website = serializers.CharField(required=False, allow_blank=True, default="")

    def validate_is_robot_verified(self, value):
        if not value:
            raise serializers.ValidationError("Robot verification failed.")
        return value

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Spam detected.")
        return value

    def validate_phone(self, value):
        cleaned = value.replace(" ", "").replace("-", "").replace(".", "")
        if not cleaned.lstrip("+").isdigit() or not (6 <= len(cleaned) <= 20):
            raise serializers.ValidationError("Invalid phone number.")
        return value

    def validate_tutoring_types(self, value):
        invalid = [t for t in value if t not in ALLOWED_TUTORING_TYPES]
        if invalid:
            raise serializers.ValidationError("Unknown tutoring type.")
        return value
