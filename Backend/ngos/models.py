from django.db import models

# Create your models here.
class NGOProfile(models.Model):
    supabase_uid = models.CharField(max_length=255, unique=True)
    org_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    address = models.TextField(blank=True)
    description = models.TextField(blank=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.org_name

class Document(models.Model):
    ngo = models.ForeignKey(NGOProfile, on_delete=models.CASCADE, related_name="documents")
    doc_type = models.CharField(max_length=100)
    file_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ngo.org_name} - {self.doc_type}"
    
class Campaign(models.Model):
    campaign_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title