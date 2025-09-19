import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

const API_BASE = "http://localhost:8080";

type AuthResponse = {
  token?: string;
  access_token?: string;
  accessToken?: string;
  tokenType?: string;
  user?: AuthUser;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const v = localStorage.getItem("token");
    if (!v || v === "undefined" || v === "null") return null;
    return v;
  });
  const [user, setUser] = useState<AuthUser | null>(null);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as AuthResponse;
      const tok = data.token ?? data.access_token ?? data.accessToken;
      if (!tok || tok === "undefined" || tok === "null") return false;
      localStorage.setItem("token", tok);
      setToken(tok);
      if (data.user) setUser(data.user);
      return true;
    } catch {
      return false;
    }
  }

  async function register(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as AuthResponse;
      const tok = data.token ?? data.access_token ?? data.accessToken;
      if (!tok || tok === "undefined" || tok === "null") return false;
      localStorage.setItem("token", tok);
      setToken(tok);
      if (data.user) setUser(data.user);
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: Boolean(token), login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
