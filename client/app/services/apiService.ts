import { BASE_URL, ErrorResponse } from "../utils/constants";

interface ApiRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

const getJwtToken = (): string | null => {
  return localStorage.getItem("token");
};

const apiRequest = async (
  url: string,
  options: ApiRequestOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const token = getJwtToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(BASE_URL + url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    // throw new Error(errorData.message || "API request failed");
    // throw new Error(`Status: ${errorData.status}, Message: ${errorData.message || "API request failed"}`);
    throw {
      status: response.status,
      message: errorData.message || "API request failed",
    } as ErrorResponse;
  }

  return response.json();
};

export default apiRequest;
