export interface EndpointInterface {
  pathBase: string;
  pathFront: string;
  pathBack: (API_URL: string | undefined) => string;
  method: string;
}

export function createEndpointInterface(
  data: Omit<EndpointInterface, "type">
): EndpointInterface & { type: "http" } {
  return { ...data, type: "http" };
}

export function isEndpointInterface(obj: Record<string, unknown>): boolean {
  return typeof obj === "object" && obj !== null && obj.type === "http";
}
