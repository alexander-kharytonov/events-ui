import { get, post, remove } from "@/api/client";
import type { CreateEventInput, Event, EventsResponse } from "@/types";

// export function getEvents(query = "") {
//   return get(`/events${query}`);
// }
export function getEvents(query = ""): Promise<EventsResponse> {
  return get<EventsResponse>(`/events${query}`);
}

// export function getEvents(query = ""): Promise<EventsResponse> {
//   return get<EventsResponse>(`/events${query}`);
// }

export function getEvent(eventId: string | number): Promise<Event> {
  return get<Event>(`/events/${eventId}`);
}
//{--Vorschlag zu ergänzen : Promise<Event>???



export function createEvent(event: CreateEventInput) : Promise<Event>{
  return post<Event, CreateEventInput>("/events", event);
}
// export function createEvent(event: CreateEventInput) { Vorschlag Promise... und unten event streichen???


export function deleteEvent(eventId: string | number) : Promise<void> {
  return remove(`/events/${eventId}`);
}
// export function deleteEvent(eventId: string | number) { // Vorschlag Promise void ...?
