from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_ngo),
    path("admin/list/", views.list_ngos),
    path("admin/verify/<int:ngo_id>/", views.verify_ngo),
    path("admin/reject/<int:ngo_id>/", views.reject_ngo),
]