"use client";
import fetchWithAuth from "@/utils/authentication";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

interface IUser {
  username: string;
  email: string;
  id: string;
}

interface IAuthState extends IUser {
  loading: boolean;
  logout: () => void; // Logout callback
}

export const AuthContext = createContext<IAuthState>({
  username: "",
  email: "",
  id: "",
  loading: true,
  logout: () => {}, // Default no-op function
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [user, setUser] = useState<IAuthState>({
    username: "",
    email: "",
    id: "",
    loading: true,
    logout: () => {}, // Initialize with no-op
  });

  const refreshToken = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: getCookie("refresh_token"),
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setCookie("access_token", data.access_token, { path: "/" });
      return data.access_token;
    }
    return null;
  };

  const getUser = async () => {
    setUser((prev) => ({
      ...prev,
      loading: true,
    }));
    let token = getCookie("access_token");
    if (!token) {
      setUser((prev) => ({
        ...prev,
        username: "",
        email: "",
        id: "",
        loading: false,
      }));
      return;
    }

    let response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response!.ok) {
      token = await refreshToken();
      if (!token) {
        setUser((prev) => ({
          ...prev,
          username: "",
          email: "",
          id: "",
          loading: false,
        }));
        return;
      }

      response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (response!.ok) {
      const user: IUser = await response!.json();
      setUser((prev) => ({ ...prev, ...user, loading: false }));
    }
  };

  const logout = async () => {
    // Clear cookies and reset user state
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setUser({
      username: "",
      email: "",
      id: "",
      loading: false,
      logout, // Re-include logout in state
    });
  };

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      logout, // Attach logout to state
    }));
    getUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
