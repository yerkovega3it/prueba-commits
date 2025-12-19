import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { NotAuthenticatedRoutes } from "./ProtectedRoutes";
import { LayoutPublicDefault } from "@/layouts";
import { HomePage } from "@/pages";
import HomeIndexPage from "@/pages/index/HomeIndexPage";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AMSA_LOGIN_URL } from "@/constants/environments";
import { NotFoundPage } from "@/pages/NotFoundPage";

function HomePageRouteWrapper() {
  const isAuthenticated = Boolean(localStorage.getItem("auth_token"));
  const location = useLocation();
  const navigate = useNavigate();
  const pathParam = location.pathname.slice(1);
  useEffect(() => {
    if (!isAuthenticated) {
      if (pathParam) {
        localStorage.setItem("pending_path_param", pathParam);
      }
      navigate("/login", { replace: true, state: { pathParam } });
    }
  }, [isAuthenticated, pathParam, navigate]);
  if (!isAuthenticated) return null;
  return <HomePage />;
}

function LoginRedirect() {
  useEffect(() => {
    window.location.href = `${AMSA_LOGIN_URL}`;
  }, []);
  return null;
}

const router = createBrowserRouter([
  {
    element: (
      <NotAuthenticatedRoutes>
        <LayoutPublicDefault />
      </NotAuthenticatedRoutes>
    ),
    children: [
      {
        path: "/login",
        element: <LoginRedirect />,
        handle: { breadcrumb: "Login" },
      },
      {
        path: "/Home/Index/:jwtToken",
        element: <HomeIndexPage />,
        errorElement: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "/:pathParam",
    element: <HomePageRouteWrapper />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
