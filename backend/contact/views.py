from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import SimpleRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactMessageSerializer

class ContactFormRateThrottle(SimpleRateThrottle):
    scope = 'contact_form'

    def get_cache_key(self, request, view):
        return f'throttle_{self.scope}_{self.get_ident(request)}'

class ContactView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ContactFormRateThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            # Get IP
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')

            contact_message = serializer.save(ip_address=ip)

            # Send Email
            try:
                send_mail(
                    subject=f"Portfolio Contact: {contact_message.subject}",
                    message=f"From: {contact_message.name} <{contact_message.email}>\n\n{contact_message.message}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.PORTFOLIO_ADMIN_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                # Log email failure but still return 201 since message is saved
                print(f"Email failed to send: {e}")

            return Response({"detail": "Message saved successfully"}, status=201)
        return Response(serializer.errors, status=400)
