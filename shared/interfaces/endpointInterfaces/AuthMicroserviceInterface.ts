import type { EndpointInterface } from "./EndpointInterface";

export interface AuthMicroserviceInterface {
  AUTH_INTEGRATED_LOGIN: EndpointInterface;
  AUTH_VALIDATE_TOKEN: EndpointInterface;
}
