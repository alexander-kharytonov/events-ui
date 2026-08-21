import { get, post } from "@/api/client";
import type { AuthResponse, Credentials, UserProfile } from "@/types";

export function registerUser(credentials: Credentials) {
  return post<UserProfile, Credentials>("/users", credentials);
}

export function loginUser(credentials: Credentials) {
  return post<AuthResponse, Credentials>("/auth/login", credentials);
}

export function getProfile() {
  return get<UserProfile>("/auth/profile");
}
