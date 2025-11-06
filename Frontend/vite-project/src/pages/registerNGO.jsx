import { useState } from "react";
import API from "../api/axios";

export default function RegisterNGO() {
  const [form, setForm] = useState({
    supabase_uid: "",
    org_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    documents: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("register/", form);
      alert("NGO Registered ✔");
      console.log(res.data);
    } catch (err) {
      alert("Error registering NGO");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Supabase UID"
        onChange={(e) => setForm({ ...form, supabase_uid: e.target.value })} />

      <input placeholder="Organization Name"
        onChange={(e) => setForm({ ...form, org_name: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <button type="submit">Register NGO</button>
    </form>
  );
}