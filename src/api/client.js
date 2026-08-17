import { getToken } from "@/api/token";
import { ApiError } from "@/api/ApiError";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(
      "Unable to connect to the server. Check your connection and try again.",
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const fallbackMessages = {
      401: "You need to sign in to continue.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      409: "This resource already exists.",
      500: "The server encountered an error. Please try again later.",
    };
    const message =
      data.error ??
      fallbackMessages[response.status] ??
      "Something went wrong. Please try again.";
    throw new ApiError(message, response.status);
  }

  return data;
}

async function get(path) {
  return apiRequest(path, {
    method: "GET",
  });
}

async function post(path, credentials) {
  return apiRequest(path, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

async function remove(path) {
  return apiRequest(path, {
    method: "DELETE",
  });
}

export { apiRequest, post, get, remove };
