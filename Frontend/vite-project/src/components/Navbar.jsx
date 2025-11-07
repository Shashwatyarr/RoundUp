import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, signOut, onAuthStateChange } from "../authhandler/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Fetch current user on mount
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();

    // 2️⃣ Listen to auth state changes (login/logout)
    const subscription = onAuthStateChange((event, session) => {
      if (session?.user) setUser(session.user);
      else setUser(null);
    });

    // 3️⃣ Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    navigate("/"); // redirect to home after logout
  };

  return (
    <header className="border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Left Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-gray-800">
            RoundUp
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            <Link to="/search" className="hover:text-green-700">
              Search
            </Link>
            <Link to="/campaigns" className="hover:text-green-700">
              Donate
            </Link>
            <Link to="/campaigns/create" className="hover:text-green-700">
              Fundraise
            </Link>
            
            {/* --- YAHAN ADD KIYA HAI --- */}
            <Link 
              to="/leaderboard" 
              className="hover:text-green-700 flex items-center gap-1.5"
            >
              <i className="fa-solid fa-ranking-star text-green-600"></i>
              Leaderboard
            </Link>
            {/* --- END --- */}

          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/about"
            className="hidden md:block text-gray-600 hover:text-green-700"
          >
            About
          </Link>

          {user ? (
            <>
              {/* Show name if available, fallback to email */}
              <span className="text-gray-600">
                Hi, {user.user_metadata?.full_name || user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signup"
              className="text-gray-600 hover:text-green-700"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/start-campaign"
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Start a RoundUp
          </Link>
        </div>
      </nav>
    </header>
  );
}