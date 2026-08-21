import { useState } from "react";
import { getToken, removeToken, storeToken } from "@/api/token";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(getToken);

  const login = (apiToken: string) => {
    storeToken(apiToken);
    setToken(apiToken);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Boolean(token), login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
