from django.contrib import admin
from .models import NGOProfile, Document, Campaign

@admin.register(NGOProfile)
class NGOProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "org_name", "email", "verified", "created_at")
    search_fields = ("org_name", "email")
    list_filter = ("verified",)

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("id", "ngo", "doc_type", "uploaded_at")
    search_fields = ("ngo__org_name", "doc_type")

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "goal", "created_at")   # ✅ changed campaign_id → id
    search_fields = ("title",)
    list_filter = ("created_at",)
