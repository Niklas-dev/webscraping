"use client";
import { getCookie } from "cookies-next";
import { createContext, useLayoutEffect, useState } from "react";

export const AuthContext = createContext<object | null>({
  username: "",
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [user, setUser] = useState<object | null>(null);

  const getUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );
    if (!response.ok) {
      return;
    }

    const user = await response.json();
    console.log(user);
    setUser();
  };

  useLayoutEffect(() => {
    getUser();
    return () => {};
  }, []);

  return (
    <>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </>
  );
}
