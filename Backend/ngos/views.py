from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import NGOProfile, Document, Campaign
from .serializers import NGOProfileSerializer, CampaignSerializer
from .permissions import IsAdminApiKey


# -------------------------------------------
# NGO Registration & Verification
# -------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def register_ngo(request):
    data = request.data
    supabase_uid = data.get("supabase_uid")
    if not supabase_uid:
        return Response({"error": "supabase_uid required"}, status=400)

    ngo, created = NGOProfile.objects.get_or_create(
        supabase_uid=supabase_uid,
        defaults={
            "org_name": data.get("org_name"),
            "email": data.get("email"),
            "phone": data.get("phone", ""),
            "address": data.get("address", ""),
            "description": data.get("description", ""),
        }
    )

    # Save documents
    for doc in data.get("documents", []):
        Document.objects.create(
            ngo=ngo,
            doc_type=doc.get("doc_type", "Other"),
            file_url=doc.get("file_url")
        )

    return Response(NGOProfileSerializer(ngo).data, status=201 if created else 200)


@api_view(["GET"])
@permission_classes([IsAdminApiKey])
def list_ngos(request):
    ngos = NGOProfile.objects.all().order_by("-created_at")
    return Response(NGOProfileSerializer(ngos, many=True).data)


@api_view(["POST"])
@permission_classes([IsAdminApiKey])
def verify_ngo(request, ngo_id):
    ngo = get_object_or_404(NGOProfile, id=ngo_id)
    ngo.verified = True
    ngo.save()
    return Response({"message": "NGO verified"})


@api_view(["POST"])
@permission_classes([IsAdminApiKey])
def reject_ngo(request, ngo_id):
    ngo = get_object_or_404(NGOProfile, id=ngo_id)
    ngo.verified = False
    ngo.save()
    return Response({"message": "NGO rejected"})


# -------------------------------------------
# NEW FEATURE: Campaign Create + List
# -------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])  # Anyone can create a campaign
def create_campaign(request):
    serializer = CampaignSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([AllowAny])  # Anyone can view campaigns
def list_campaigns(request):
    campaigns = Campaign.objects.all().order_by("-created_at")
    serializer = CampaignSerializer(campaigns, many=True)
    return Response(serializer.data)