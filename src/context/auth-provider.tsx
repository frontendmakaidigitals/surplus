"use client";
import { createContext, useContext, ReactNode } from "react";
import { User as NavUser } from "@/ui/nav/nav";

interface Auth {
  isLoggedIn: boolean;
  user: NavUser | null;
}

interface AuthProviderProps {
  children: ReactNode;
  initialAuth: {
    isAuthenticated: boolean;
    user?: NavUser | null;
  };
}

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children, initialAuth }: AuthProviderProps) {
  const isLoggedIn = initialAuth.isAuthenticated;
  const user: NavUser | null = initialAuth.user ?? null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
