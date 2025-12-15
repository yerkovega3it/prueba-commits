export interface WebSocketInterface {
  pathBase: string;
  pathFront: string;
  pathBack: (WS_URL: string | undefined) => string;
}

export function createWebSocketInterface(data: Omit<WebSocketInterface, 'type'>): WebSocketInterface & { type: 'ws' } {
  return { ...data, type: 'ws' };
}

export function isWebSocketInterface(obj: Record<string, unknown>): boolean {
  return typeof obj === 'object' && obj !== null && obj.type === 'ws';
}

export default WebSocketInterface;
