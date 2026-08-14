import { useState } from "react";
import { getToken, removeToken, storeToken } from "@/api/token";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken);

  const login = (apiToken) => {
    storeToken(apiToken);
    setToken(apiToken);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: Boolean(token), login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
