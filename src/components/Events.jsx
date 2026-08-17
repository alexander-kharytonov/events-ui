import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCalendarDays,
  HiClock,
  HiIdentification,
  HiMapPin,
  HiUserCircle,
} from "react-icons/hi2";
import { getEvents } from "@/api/events";
import FeedbackMessage from "@/components/FeedbackMessage";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "long",
  timeStyle: "short",
});

const compactDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value, formatter = dateFormatter) {
  if (!value) return "Not specified";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : formatter.format(date);
}

function EventCard({ event }) {
  const hasCoordinates =
    event.latitude !== null &&
    event.latitude !== undefined &&
    event.longitude !== null &&
    event.longitude !== undefined;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-600/10">
            <HiIdentification className="text-base" aria-hidden="true" />
            Event #{event.id}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
            <HiCalendarDays className="text-lg text-brand-600" aria-hidden="true" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
          {event.title}
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          {event.description || "No description provided."}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="flex gap-3 sm:col-span-2">
            <HiMapPin className="mt-0.5 shrink-0 text-xl text-brand-600" aria-hidden="true" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Location
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {event.location}
              </dd>
              <dd className="mt-1 text-sm text-slate-500">
                {hasCoordinates
                  ? `${event.latitude}, ${event.longitude}`
                  : "Coordinates not specified"}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <HiUserCircle className="mt-0.5 shrink-0 text-xl text-brand-600" aria-hidden="true" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Organizer
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                User #{event.organizerId}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <HiClock className="mt-0.5 shrink-0 text-xl text-brand-600" aria-hidden="true" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Record history
              </dt>
              <dd className="mt-1 text-sm text-slate-600">
                Created {formatDate(event.createdAt, compactDateFormatter)}
              </dd>
              <dd className="mt-1 text-sm text-slate-600">
                Updated {formatDate(event.updatedAt, compactDateFormatter)}
              </dd>
            </div>
          </div>
        </dl>

        <Link
          to={`/events/${event.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-600"
        >
          View event
          <HiArrowRight className="text-base" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

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
          <HiCalendarDays className="mx-auto text-4xl text-slate-300" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">No events yet</h2>
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