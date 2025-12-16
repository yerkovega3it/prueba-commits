import type { DashboardMicroserviceInterface } from "../../interfaces/endpointInterfaces/DashboardMicroserviceInterface";
import { createEndpointInterface } from "../../interfaces/endpointInterfaces/EndpointInterface";

const DashboardMicroserviceEndpoints: DashboardMicroserviceInterface = {
  DASHBOARD_GET: createEndpointInterface({
    pathBase: "/api/dashboard/get",
    get pathFront() {
      return this.pathBase;
    },
    pathBack: (API_URL) => `${API_URL}/api/dashboard/get`,
    method: "GET",
  }),
};

export default DashboardMicroserviceEndpoints;
