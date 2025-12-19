import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

export function AuthenticatedRoutes({ children }: PropsWithChildren) {
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function NotAuthenticatedRoutes({ children }: PropsWithChildren) {
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}
