// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  loginApi,
  requestOtpApi,
  verifyOtpApi,
  getMeApi,
} from "../api/auth";

const AuthContext = createContext(null);

const USER_KEY = "campkart_user";
const TOKEN_KEY = "campkart_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load existing session from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Error loading auth from storage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistSession = (userObj, tokenStr) => {
    setUser(userObj);
    setToken(tokenStr);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    localStorage.setItem(TOKEN_KEY, tokenStr);
  };

  // ---------- LOGIN (email + password) ----------
  const login = async (email, password) => {
    const data = await loginApi(email, password); // { token, user, message }
    persistSession(data.user, data.token);
    return data.user;
  };

  // ---------- SIGNUP STEP 1: request OTP ----------
  // formData: { name, email, password, campus?, phone? ... }
  const signupStart = async (formData) => {
    const result = await requestOtpApi(formData);
    // result: { message, email, expiresIn }
    return result;
  };

  // ---------- SIGNUP STEP 2: verify OTP ----------
  const signupVerify = async (email, otp) => {
    const data = await verifyOtpApi(email, otp); // { token, user, message }
    persistSession(data.user, data.token);
    return data.user;
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  // ---------- OPTIONALLY: REFRESH CURRENT USER FROM /me ----------
  const refreshUser = async () => {
    if (!token) return;
    try {
      const data = await getMeApi(token);
      if (data?.user) {
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isVerifiedStudent: !!user?.isVerifiedStudent,
    login,          // (email, password)
    signupStart,    // (formData) → request OTP
    signupVerify,   // (email, otp) → final signup + login
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
