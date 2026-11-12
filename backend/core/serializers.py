import re

from rest_framework import serializers


ALLOWED_TUTORING_TYPES = {"Matematică BAC", "Informatică BAC", "Introducere în Informatică"}

# C0/C1 control characters, plus the Unicode line and paragraph separators that
# some mail clients treat as newlines.
_CONTROL = re.compile(r"[\x00-\x1f\x7f-\x9f  ]")
# The message body may keep its line breaks and tabs.
_CONTROL_EXCEPT_NEWLINES = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]")


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
    website = serializers.CharField(required=False, allow_blank=True, default="", max_length=200)

    def validate_name(self, value):
        # The name goes into the Subject header of the notification email. A
        # line break there is a header-injection attempt; Django would refuse
        # to send it, but as an unhandled BadHeaderError — a 500 for the
        # visitor. Reject it here as the bad input it is.
        if _CONTROL.search(value):
            raise serializers.ValidationError("Invalid characters in name.")
        return value

    def validate_message(self, value):
        if _CONTROL_EXCEPT_NEWLINES.search(value):
            raise serializers.ValidationError("Invalid characters in message.")
        return value

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
        digits = cleaned.lstrip("+")
        # isascii: str.isdigit() is true for every Unicode digit, so without
        # it "٠٧٧٤…" or "⁰⁷⁷⁴" passes validation and lands in the inbox.
        if not (digits.isascii() and digits.isdigit()) or not (6 <= len(cleaned) <= 20):
            raise serializers.ValidationError("Invalid phone number.")
        return value

    def validate_tutoring_types(self, value):
        invalid = [t for t in value if t not in ALLOWED_TUTORING_TYPES]
        if invalid:
            raise serializers.ValidationError("Unknown tutoring type.")
        return value
