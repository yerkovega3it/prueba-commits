import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthenticatedRoutes, NotAuthenticatedRoutes } from "./ProtectedRoutes";
import { LayoutPublicDefault, LayoutPrivateDefault } from "@/layouts";
import { HomePage, LoginPage } from "@/pages";
import HomeIndexPage from "@/pages/index/HomeIndexPage";

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
        element: <LoginPage />,
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
    element: (
      <AuthenticatedRoutes>
        <LayoutPrivateDefault />
      </AuthenticatedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: { breadcrumb: "Dashboard" },
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
