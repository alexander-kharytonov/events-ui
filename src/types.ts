export type Credentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type UserProfile = {
  id: number;
  email: string;
};

export type Event = {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  organizerId: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventInput = Omit<Event, "id" | "createdAt" | "updatedAt">;

export type EventsResponse = {
  results: Event[];
};
