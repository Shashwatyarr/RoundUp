from rest_framework.permissions import BasePermission
from django.conf import settings

class IsAdminApiKey(BasePermission):
    def has_permission(self, request, view):
        key = request.META.get("HTTP_X_ADMIN_API_KEY", "")
        return key == getattr(settings, "ADMIN_API_KEY", "")