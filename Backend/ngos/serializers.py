from rest_framework import serializers
from .models import NGOProfile, Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "doc_type", "file_url", "uploaded_at"]

class NGOProfileSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = NGOProfile
        fields = [
            "id", "supabase_uid", "org_name", "email", "phone", "address",
            "description", "verified", "created_at", "updated_at", "documents"
        ]
