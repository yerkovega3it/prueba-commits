import { useParams, useNavigate } from "react-router-dom";

import { authUtils } from "../../utils/auth.util";
import { authService } from "@/services";

export default function HomeIndexPage() {
  const navigate = useNavigate();
  const { jwtToken } = useParams();

  const pendingPathParam = localStorage.getItem("pending_path_param");

  authService.integratedLogin(jwtToken as string).then((res) => {
    const loginLoader = authUtils.loginLoader(res, "integrated");
    if (pendingPathParam) {
      localStorage.removeItem("pending_path_param");
      navigate(`/${pendingPathParam}`);
    } else {
      navigate("/", { state: { token: jwtToken } });
    }
    return loginLoader;
  });

  return (
    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
      <div className="bg-green-500 h-full animate-pulse"></div>
    </div>
  );
}
