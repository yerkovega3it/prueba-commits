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
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "@/services/validateToken.api";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";

function HomePageRouteWrapper() {
  const token = localStorage.getItem("auth_token") as string;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth_token"],
    queryFn: () => validateToken(token),
    retry: false,
  });
  const isAuthenticated = (data?.validToken && !isError) || false;
  const location = useLocation();
  const navigate = useNavigate();
  const pathParam = location.pathname.slice(1);

  if (isError) {
    localStorage.removeItem("auth_token");
    navigate("/login", { replace: true, state: { pathParam } });
  }

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      if (pathParam) {
        console.log("pathParam:", pathParam);
        localStorage.setItem("pending_path_param", pathParam);
      }
      navigate("/login", { replace: true, state: { pathParam } });
    }
  }, [isAuthenticated, pathParam, navigate, isLoading]);
  if (isLoading) return null;
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
    path: "/error401",
    element: <UnauthorizedPage />,
  },
  {
    path: "/error404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
