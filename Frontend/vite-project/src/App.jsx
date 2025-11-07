import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NGORegister from "./pages/NGORegister";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignList from "./pages/CampaignList";
import Campaign from "./pages/Campaign";
import Donate from "./pages/Donate";
import Footer from "./components/footer";
import AuthPage from "./pages/signup";
import Leaderboard from "./pages/Leaderboard";
import RegisterNGO from "./pages/registerNGO";
import CampaignPage from "./pages/campaingpage";

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngoregister" element={<NGORegister />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/create" element={<CreateCampaign />} />
          {/* <Route path="/campaigns/:id" element={<Campaign />} /> */}
          <Route path="/donate/:id" element={<Donate />} />
          <Route path="/signup" element={<AuthPage/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/register" element={<RegisterNGO/>}/>
          <Route path="/campaign/:id" element={<CampaignPage />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}
