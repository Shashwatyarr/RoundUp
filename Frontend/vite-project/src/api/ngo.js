import API from "./axios";

// Create campaign — we send JSON (no file)
export const createCampaign = (payload) => {
  return API.post("campaign/create/", payload);
};

// Get campaign list
export const getCampaigns = () => {
  return API.get("campaign/list/");
};

// Get single campaign
export const getCampaign = (id) => {
  return API.get(`campaign/${id}/`);
};
