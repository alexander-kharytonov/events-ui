import { post } from "@/api/client";

export function registerUser(credentials) {
  return post("/users", credentials);
}

export function loginUser(credentials) {
  return post("/auth/login", credentials);
}
