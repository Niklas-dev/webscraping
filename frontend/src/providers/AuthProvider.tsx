"use client";
import fetchWithAuth from "@/utils/authentication";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

interface IUser {
  username: string;
  email: string;
  id: string;
}

interface IAuthState extends IUser {
  loading: boolean;
}
export const AuthContext = createContext<IAuthState>({
  username: "",
  email: "",
  id: "",
  loading: true,
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
  });
  const access_token = getCookie("access_token");
  const getUser = async () => {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("reached");
    if (!response) {
      setUser({ ...user, loading: false });
    } else {
      if (response!.ok) {
        const user: IUser = await response!.json();
        console.log(user);
        setUser({ ...user, loading: false });
      }
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
