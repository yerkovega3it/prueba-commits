import type { AuthMicroserviceInterface } from "@shared/interfaces/endpointInterfaces/AuthMicroserviceInterface";
import type { DashboardMicroserviceInterface } from "@shared/interfaces/endpointInterfaces/DashboardMicroserviceInterface";

export interface InternalServerInterface
  extends AuthMicroserviceInterface,
    DashboardMicroserviceInterface {
  // Solo implementaciones de microservicios
}
