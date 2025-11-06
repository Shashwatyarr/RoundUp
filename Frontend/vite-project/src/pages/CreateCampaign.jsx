import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../api/ngo";

export default function CreateCampaign() {
  const [form, setForm] = useState({
    title: "",
    goal: 50000,
    story: "",
    image_url: "", // user will paste an image URL (or leave blank)
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // We send JSON — image_url is a string (no file)
      const payload = {
        title: form.title,
        goal: Number(form.goal),
        story: form.story,
        image_url: form.image_url || "",
      };

      const res = await createCampaign(payload);
      console.log("Created:", res.data);
      setMsg("✅ Campaign created successfully!");
      nav("/campaigns");
    } catch (err) {
      console.error("Error creating campaign:", err);
      const msg = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      setMsg("❌ Failed to create campaign: " + msg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Goal (in ₹)"
          type="number"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Story"
          value={form.story}
          onChange={(e) => setForm({ ...form, story: e.target.value })}
          rows={6}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            type="url"
            className="w-full border p-2 rounded"
            placeholder="https://example.com/image.jpg"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Create
        </button>
      </form>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
