import requests

base = "http://127.0.0.1:8000/api/ngo"

payload = {
    "supabase_uid": "uid-12345",
    "org_name": "Helping Hands",
    "email": "help@ngo.org",
    "phone": "9876543210",
    "address": "Delhi, India",
    "description": "We help underprivileged children",
    "documents": [
        {"doc_type": "PAN", "file_url": "https://example.com/pan.png"},
        {"doc_type": "12A", "file_url": "https://example.com/12a.pdf"},
    ],
}

r = requests.post(f"{base}/register/", json=payload)
print("Register NGO:", r.status_code, r.json())

headers = {"X-ADMIN-API-KEY": "replace_with_secure_admin_api_key"}
r2 = requests.get(f"{base}/admin/list/", headers=headers)
print("List NGOs:", r2.status_code, r2.json())
