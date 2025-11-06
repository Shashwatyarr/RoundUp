import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCampaign } from "../api/ngo";

export default function CampaignPage() {
  const { id } = useParams();
  const [c, setC] = useState(null);

  useEffect(() => {
    getCampaign(id)
      .then((res) => setC(res.data))
      .catch(console.error);
  }, [id]);

  if (!c) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <img
        src={c.image_url || "https://via.placeholder.com/800x300"}
        alt={c.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold">{c.title}</h1>
      <p className="text-sm text-gray-600 my-3">{c.story}</p>

      <div className="flex items-center justify-between mt-4">
        <div>
          <strong className="text-lg">Raised: ₹{c.raised}</strong>
          <p className="text-sm text-gray-500">Goal: ₹{c.goal}</p>
        </div>
        <Link to={`/donate/${c.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Donate
        </Link>
      </div>
    </div>
  );
}
