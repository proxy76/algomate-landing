from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from .models import Module, Feature
from .serializers import ModuleSerializer, FeatureSerializer, ContactSerializer


class ContactThrottle(AnonRateThrottle):
    rate = '5/hour'


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]

class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    permission_classes = [AllowAny]

class ContactAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            # Format tutoring types
            tutoring_list = ", ".join(data.get('tutoring_types', [])) or "Nespecificat"

            # Construct email message
            subject = f"Mesaj nou de la {data['name']} - Meditații"
            message_body = f"""
            Ai primit un mesaj nou de pe site-ul AlgoMate.
            
            Detalii Contact:
            ----------------
            Nume: {data['name']}
            Email: {data['email']}
            Telefon: {data['phone']}
            Interesat de: {tutoring_list}
            
            Mesaj:
            ----------------
            {data['message']}
            """
            
            try:
                # Send email (prints to console in dev)
                send_mail(
                    subject,
                    message_body,
                    settings.DEFAULT_FROM_EMAIL,
                    ['algomate.razvan@gmail.com'],
                    fail_silently=False,
                )
                return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": "Failed to send email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
