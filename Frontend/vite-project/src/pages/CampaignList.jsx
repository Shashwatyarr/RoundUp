import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../api/ngo";

export default function CampaignList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getCampaigns()
      .then((res) => setList(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      {list.length === 0 && <p>No campaigns yet.</p>}
      <div className="space-y-4">
        {list.map((c) => (
          <div key={c.id} className="border p-4 rounded flex gap-4">
            <img
              src={c.image_url || "https://via.placeholder.com/300x150"}
              alt=""
              className="w-48 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <Link to={`/campaign/${c.id}`} className="text-lg font-semibold">
                {c.title}
              </Link>
              <p className="text-sm text-gray-600">{c.story?.slice(0, 140)}...</p>
              <p className="mt-2 text-sm">
                Raised: ₹{c.raised} • Goal: ₹{c.goal}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
