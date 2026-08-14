import { get } from "@/api/client";

export function getEvents() {
  return get("/events");
}

export function getEvent(eventId) {
  return get(`/events/${eventId}`);
}
