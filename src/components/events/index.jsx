import { useEffect, useState } from "react";
import { HiCalendarDays } from "react-icons/hi2";
import { getEvents } from "@/api/events";
import EventCard from "./EventCard";
import FeedbackMessage from "@/components/FeedbackMessage";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchEvents() {
      try {
        const eventsData = await getEvents();

        if (!isCancelled) {
          setEvents(eventsData.results ?? []);
        }
      } catch (fetchError) {
        if (!isCancelled) {
          setError(fetchError.message || "Unable to load events.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section aria-labelledby="events-heading">
      <div className="mb-8 sm:flex sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Discover what's next
          </p>
          <h1
            id="events-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Events
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse upcoming experiences and find all the details in one place.
          </p>
        </div>
        {!isLoading && !error && (
          <p className="mt-4 text-sm font-medium text-slate-500 sm:mt-0">
            {events.length} {events.length === 1 ? "event" : "events"}
          </p>
        )}
      </div>

      {isLoading && (
        <div className="grid gap-6 lg:grid-cols-2" aria-label="Loading events">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      )}

      {error && <FeedbackMessage>{error}</FeedbackMessage>}

      {!isLoading && !error && events.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <HiCalendarDays
            className="mx-auto text-4xl text-slate-300"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No events yet
          </h2>
          <p className="mt-2 text-slate-500">New events will appear here.</p>
        </div>
      )}

      {!isLoading && !error && events.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
