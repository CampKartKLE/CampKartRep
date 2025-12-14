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

  // -----------------------------
  // Load existing session on refresh
  // -----------------------------
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        // optional: refresh user data from backend
        getMeApi()
          .then((data) => {
            if (data?.user) {
              setUser(data.user);
              localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
          })
          .catch(() => {
            // token invalid → logout user
            logout();
          });
      }
    } catch (err) {
      console.error("Error loading auth from storage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // -----------------------------
  // Persist login/signup session
  // -----------------------------
  const persistSession = (userObj, tokenStr) => {
    setUser(userObj);
    setToken(tokenStr);
    localStorage.setItem(USER_KEY, JSON.stringify(userObj));
    localStorage.setItem(TOKEN_KEY, tokenStr);
  };

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (email, password) => {
    const data = await loginApi(email, password); // { token, user }
    persistSession(data.user, data.token);
    return data.user;
  };

  // -----------------------------
  // SIGNUP STEP 1: Request OTP
  // -----------------------------
  const signupStart = async (formData) => {
    return await requestOtpApi(formData); // { message, email, expiresIn }
  };

  // -----------------------------
  // SIGNUP STEP 2: Verify OTP + Create Account
  // -----------------------------
  const signupVerify = async (email, otp) => {
    const data = await verifyOtpApi(email, otp); // { user, token }
    persistSession(data.user, data.token);
    return data.user;
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  // -----------------------------
  // REFRESH USER (optional)
  // -----------------------------
  const refreshUser = async () => {
    try {
      const data = await getMeApi();
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
    login,
    signupStart,
    signupVerify,
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
