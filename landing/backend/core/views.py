import logging

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .serializers import ContactSerializer

logger = logging.getLogger(__name__)

# Per-email rate limit: max 3 submissions per 24h from the same email address.
EMAIL_RATE_LIMIT = 3
EMAIL_RATE_WINDOW_SECONDS = 60 * 60 * 24


class ContactAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        email_key = f"contact:email:{data['email'].lower()}"
        submissions = cache.get(email_key, 0)
        if submissions >= EMAIL_RATE_LIMIT:
            return Response(
                {"detail": "Too many submissions from this email. Try again later."},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        tutoring_list = ", ".join(data.get("tutoring_types", [])) or "Nespecificat"
        subject = f"Mesaj nou de la {data['name']} - Meditații"
        message_body = (
            "Ai primit un mesaj nou de pe site-ul AlgoMate.\n\n"
            "Detalii Contact:\n"
            "----------------\n"
            f"Nume: {data['name']}\n"
            f"Email: {data['email']}\n"
            f"Telefon: {data['phone']}\n"
            f"Interesat de: {tutoring_list}\n\n"
            "Mesaj:\n"
            "----------------\n"
            f"{data['message']}\n"
        )

        try:
            send_mail(
                subject,
                message_body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_RECIPIENT_EMAIL],
                fail_silently=False,
            )
        except Exception:
            logger.exception("Failed to send contact email")
            return Response(
                {"detail": "Failed to send email."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        cache.set(email_key, submissions + 1, EMAIL_RATE_WINDOW_SECONDS)
        return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
