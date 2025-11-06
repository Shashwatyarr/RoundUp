from django.urls import path
from . import views

urlpatterns = [
    # NGO Registration + Admin Controls
    path("register/", views.register_ngo),
    path("admin/list/", views.list_ngos),
    path("admin/verify/<int:ngo_id>/", views.verify_ngo),
    path("admin/reject/<int:ngo_id>/", views.reject_ngo),

    # ✅ New Campaign Endpoints
    path("campaign/create/", views.create_campaign),
    path("campaign/list/", views.list_campaigns),
]
