import { get, post, remove } from "@/api/client";
// import type { CreateEventInput, Event, EventsResponse } from "@/types";

export function getEvents(query = "") {
  return get(`/events${query}`);
}

// export function getEvents(query = ""): Promise<EventsResponse> {
//   return get<EventsResponse>(`/events${query}`);
// }

export function getEvent(eventId) {
  return get(`/events/${eventId}`);
}

// export function getEvent(eventId: string | number) {
//   return get<Event>(`/events/${eventId}`);
// }

export function createEvent(event) {
  return post("/events", event);
}

// export function createEvent(event: CreateEventInput) {
//   return post<Event, CreateEventInput>("/events", event);
// }

export function deleteEvent(eventId) {
  return remove(`/events/${eventId}`);
}

// export function deleteEvent(eventId: string | number) {
//   return remove(`/events/${eventId}`);
// }
