import axiosClient from "./axiosClient";

export const loginApi = async (email, password) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data;
};

export const requestOtpApi = async (formData) => {
  const res = await axiosClient.post("/auth/request-otp", formData);
  return res.data;
};

export const verifyOtpApi = async (email, otp) => {
  const res = await axiosClient.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const getMeApi = async (token) => {
  const res = await axiosClient.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
