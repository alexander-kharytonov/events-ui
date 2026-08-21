import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
