from django.urls import path
from . import views

urlpatterns = [
    # NGO endpoints
    path("register/", views.register_ngo),
    path("admin/list/", views.list_ngos),
    path("admin/verify/<int:ngo_id>/", views.verify_ngo),
    path("admin/reject/<int:ngo_id>/", views.reject_ngo),

    # Campaign endpoints (JSON-based)
    path("campaign/create/", views.create_campaign),
    path("campaign/list/", views.list_campaigns),
    path("campaign/<int:pk>/", views.campaign_detail),
]
