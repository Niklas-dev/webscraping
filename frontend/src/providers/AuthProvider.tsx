"use client";
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
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/get-user`);
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
