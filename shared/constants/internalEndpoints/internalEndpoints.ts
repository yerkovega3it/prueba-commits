import type { InternalServerInterface } from "@shared/interfaces/endpointInterfaces/InternalServerInterface";

import AuthMicroserviceEndpoints from "./AuthMicroserviceEndpoints";
import DashboardMicroserviceEndpoints from "./DashboardMicroserviceEndpoints";

export const internalEndpoints: InternalServerInterface = {
  ...AuthMicroserviceEndpoints,
  ...DashboardMicroserviceEndpoints,
};
