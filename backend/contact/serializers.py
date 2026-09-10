from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

    def validate_message(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value
