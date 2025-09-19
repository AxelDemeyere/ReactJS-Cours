import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth?.isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
