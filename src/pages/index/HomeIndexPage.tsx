import { useParams, useNavigate } from "react-router-dom";

import { authUtils } from "../../utils/auth.util";
import { authService } from "@/services";
import { UnauthorizedPage } from "../UnauthorizedPage";
import { useEffect, useState } from "react";

export default function HomeIndexPage() {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();
  const { jwtToken } = useParams();

  const pendingPathParam = localStorage.getItem("pending_path_param");

  useEffect(() => {
    authService
      .integratedLogin(jwtToken as string, pendingPathParam as string)
      .then((res) => {
        const loginLoader = authUtils.loginLoader(res, "integrated");
        if (pendingPathParam) {
          localStorage.removeItem("pending_path_param");
          navigate(`/${pendingPathParam}`);
        } else {
          navigate("/", { state: { token: jwtToken } });
        }
        return loginLoader;
      })
      .catch((error) => {
        if (error.status === 401) {
          setIsUnauthorized(true);
        } else {
          navigate(`/${pendingPathParam}`);
        }
      });
  }, []);
  if (isUnauthorized) {
    window.history.replaceState({}, "", `/${pendingPathParam}`);
    return <UnauthorizedPage />;
  }
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
      <div className="bg-green-500 h-full animate-pulse"></div>
    </div>
  );
}
