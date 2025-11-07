import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCampaign } from "../api/ngo"; // ✅ correct import

export default function CampaignPage() {
  const { id } = useParams();
  const [c, setC] = useState(null);

  useEffect(() => {
    getCampaign(id)
      .then((res) => setC(res.data))
      .catch((err) => console.error("Error fetching campaign:", err));
  }, [id]);

  if (!c) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Safely handle missing values
  const raised = c.raised ?? 0;
  const goal = c.goal ?? 0;
  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* LEFT SECTION */}
      <div className="md:col-span-2">
        <img
          src={c.image_url || "https://via.placeholder.com/800x300"}
          alt={c.title}
          className="w-full h-72 object-cover rounded-lg"
        />

        <h1 className="text-3xl font-bold mt-5">{c.title}</h1>

        <p className="text-gray-700 mt-4 leading-relaxed">
          {c.story || c.description || "No description available."}
        </p>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="bg-gray-50 border rounded-lg p-6 h-fit shadow-sm">
        
        <h2 className="text-2xl font-semibold">
          ₹{raised.toLocaleString()} raised
        </h2>
        <p className="text-gray-600 mb-3">of ₹{goal.toLocaleString()} goal</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <Link
          to={`/donate/${c.id}`}
          className="block w-full bg-green-600 text-white text-center py-2 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Donate now
        </Link>

        {/* Dummy supporters for now */}
        <h3 className="mt-6 font-semibold text-gray-700">Recent Supporters</h3>
        <ul className="mt-3 text-sm text-gray-600 space-y-1">
          <li>Jessica • ₹20</li>
          <li>Katie • ₹1000</li>
          <li>Anonymous • ₹50</li>
        </ul>
      </div>
    </div>
  );
}
