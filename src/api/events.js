import { get, post, remove } from "@/api/client";

export function getEvents(query = "") {
  return get(`/events${query}`);
}

export function getEvent(eventId) {
  return get(`/events/${eventId}`);
}

export function createEvent(event) {
  return post("/events", event);
}

export function deleteEvent(eventId) {
  return remove(`/events/${eventId}`);
}
