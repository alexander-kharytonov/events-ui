import { get } from "@/api/client";

export function getEvents() {
  return get("/events");
}
