import { Navigate, useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";

export function AuthenticatedRoutes({ children }: PropsWithChildren) {
  const { state } = useLocation();

  if (!state?.token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export function NotAuthenticatedRoutes({ children }: PropsWithChildren) {
  const { state } = useLocation();

  // If already authenticated (has token), redirect to home
  if (state?.token) return <Navigate to="/" replace />;

  return <>{children}</>;
}
