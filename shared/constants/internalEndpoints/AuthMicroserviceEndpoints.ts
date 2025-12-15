import type { AuthMicroserviceInterface } from "../../interfaces/endpointInterfaces/AuthMicroserviceInterface";
import { createEndpointInterface } from "../../interfaces/endpointInterfaces/EndpointInterface";

const AuthMicroserviceEndpoints: AuthMicroserviceInterface = {
  AUTH_INTEGRATED_LOGIN: createEndpointInterface({
    pathBase: "/api/auth/integrated-login",
    get pathFront() {
      return this.pathBase;
    },
    pathBack: (API_URL) => `${API_URL}/auth/integrated-login`,
    method: "POST",
  }),
  AUTH_VALIDATE_TOKEN: createEndpointInterface({
    pathBase: "/api/auth/validateToken",
    get pathFront() {
      return this.pathBase;
    },
    pathBack: (API_URL) => `${API_URL}/auth/validateToken`,
    method: "POST",
  }),
};

export default AuthMicroserviceEndpoints;
