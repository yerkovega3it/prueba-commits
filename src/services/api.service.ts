import { authUtils } from "../utils/auth.util";

interface WebSocketInstance {
  websocket: WebSocket | null;
}
export type AbortedType = {
  aborted: boolean;
};
function catchFunction(error: unknown, reject: (reason: unknown) => void) {
  if (error instanceof DOMException && error.name === "AbortError") {
    reject({ aborted: true } as AbortedType);
  } else {
    reject(error);
  }
}

async function makeRequest<Payload, Response>({
  method,
  endpoint,
  data,
  params,
  signal,
  debounceMs,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: Partial<Payload> | FormData;
  params?: Record<string, string>;
  signal?: AbortSignal;
  debounceMs?: number;
}): Promise<Response> {
  const token = authUtils.getToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const queryString = params ? new URLSearchParams(params).toString() : "";
  const url = `${endpoint}${queryString ? `?${queryString}` : ""}`;

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    signal,
  };

  if (method !== "GET" && data) {
    options.body = data instanceof FormData ? data : JSON.stringify(data);
  }
  const executionFetch = async () => {
    const response = await fetch(url, options);

    if (!response.ok) {
      const rawError = await response.text();
      let parsed: unknown;
      try {
        parsed = rawError ? JSON.parse(rawError) : undefined;
      } catch {
        parsed = undefined;
      }
      const errorPayload =
        parsed && typeof parsed === "object" ? parsed : { message: rawError };
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorPayload,
        message:
          (errorPayload as { message?: string }).message ||
          `Failed to ${method.toLowerCase()}: ${response.status} ${
            response.statusText
          }`,
      };
    }

    const result = await response.json();
    return result.data || result;
  };
  let timeout: NodeJS.Timeout | null = null;

  if (timeout) clearTimeout(timeout);
  return new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      if (signal !== undefined && signal.aborted) {
        catchFunction(new DOMException("Aborted", "AbortError"), reject);
        return;
      }
      return executionFetch()
        .then(resolve)
        .catch((error) => {
          catchFunction(error, reject);
        })
        .finally(() => {
          timeout = null;
        });
    }, debounceMs || 0);
  });
}

type GetParams = {
  endpoint: string;
  params?: Record<string, string>;
  returnAll?: boolean;
  signal?: AbortSignal;
  debounceMs?: number;
};

type PostParams<Payload> = {
  endpoint: string;
  data: Partial<Payload> | FormData;
  signal?: AbortSignal;
  debounceMs?: number;
};

type PutParams<Payload> = {
  endpoint: string;
  data?: Partial<Payload> | FormData;
  signal?: AbortSignal;
  debounceMs?: number;
};

type DeleteParams<Payload> = {
  endpoint: string;
  data?: Partial<Payload>;
  signal?: AbortSignal;
  debounceMs?: number;
};

type WebSocketParams<MessageType> = {
  endpoint: string;
  params?: Record<string, string>;
  onOpen?: () => void;
  onReceivedMessage?: (data: MessageType) => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};
export type WebSocketResponse = {
  close?: () => void;
};

export const apiService = {
  async get<Response>({
    endpoint,
    params = {},
    signal,
    debounceMs,
  }: GetParams): Promise<Response> {
    return makeRequest<undefined, Response>({
      method: "GET",
      endpoint,
      params,
      signal,
      debounceMs,
    });
  },
  async post<Payload, Response>({
    endpoint,
    data,
    signal,
    debounceMs,
  }: PostParams<Payload>): Promise<Response> {
    return makeRequest<Payload, Response>({
      method: "POST",
      endpoint,
      data,
      signal,
      debounceMs,
    });
  },
  async put<Payload, Response>({
    endpoint,
    data,
    signal,
    debounceMs,
  }: PutParams<Payload>): Promise<Response> {
    return makeRequest<Payload, Response>({
      method: "PUT",
      endpoint,
      data,
      signal,
      debounceMs,
    });
  },
  async delete<Payload, Response>({
    endpoint,
    data,
    signal,
    debounceMs,
  }: DeleteParams<Payload>): Promise<Response> {
    return makeRequest<Payload, Response>({
      method: "DELETE",
      endpoint,
      data,
      signal,
      debounceMs,
    });
  },
  async websocket<MessageType>({
    endpoint,
    params = {},
    onOpen,
    onReceivedMessage,
    onClose,
    onError,
  }: WebSocketParams<MessageType>): Promise<WebSocketResponse> {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dmVnYS4zaXRAYW1pbmVyYWxzLmNsIiwidXNlcl9pZCI6MSwiaWF0IjoxNzY0NTk1OTI5LCJleHAiOjE3NjQ2MjQ3Mjl9.WNpPvX4jtbbCFPtkv3ba8rwl7zU7thoQa2t2IH-byiQ";
    params = params || {};
    params = { ...params, t: token };
    const queryString = new URLSearchParams(params).toString();
    const endpointFinal = `${endpoint}?${queryString}`;
    const ws: WebSocketInstance = { websocket: null };
    ws.websocket = new WebSocket(`${endpointFinal}`);

    ws.websocket.onopen = () => {
      if (onOpen) onOpen();
    };

    ws.websocket.onmessage = (event) => {
      if (onReceivedMessage)
        onReceivedMessage(JSON.parse(event.data) as MessageType);
    };

    ws.websocket.onclose = () => {
      console.log("WebSocket closed: " + endpointFinal);
      if (onClose) onClose();
      ws.websocket = null; // reset
    };

    ws.websocket.onerror = (err) => {
      if (onError) onError(err);
    };

    const close = () => {
      ws.websocket?.close();
    };
    return { close };
  },
};
