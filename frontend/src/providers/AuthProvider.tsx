"use client";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

interface IUser {
  username: string;
  email: string;
  id: string;
}
export const AuthContext = createContext<IUser | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const access_token = getCookie("access_token");
  const getUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.ok) {
      const user: IUser = await response.json();
      console.log(user);
      setUser(user);
    }
  };

  useLayoutEffect(() => {
    getUser();
    return () => {};
  }, [access_token]);

  return (
    <>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </>
  );
}
