import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "@/api/events";
import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiCalendarDays,
  HiClock,
  HiIdentification,
  HiMapPin,
  HiUserCircle,
} from "react-icons/hi2";
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

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchEvent() {
      try {
        const eventData = await getEvent(eventId);

        if (!isCancelled) {
          setEvent(eventData);
        }
      } catch (fetchError) {
        if (!isCancelled) {
          setError(fetchError.message || "Unable to load event.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchEvent();

    return () => {
      isCancelled = true;
    };
  }, [eventId]);

  const hasCoordinates =
    event?.latitude !== null &&
    event?.latitude !== undefined &&
    event?.longitude !== null &&
    event?.longitude !== undefined;

  if (isLoading) {
    return (
      <main className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading event details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-8">
        <FeedbackMessage type="error" title="Error" message={error} />
      </main>
    );
  }

  if (!event) {
    return (
      <main className="py-8">
        <FeedbackMessage
          type="error"
          title="Not Found"
          message="Event not found."
        />
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
        >
          <HiArrowLeft className="text-base" aria-hidden="true" />
          Back
        </button>
      </div>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-600/10">
              <HiIdentification className="text-base" aria-hidden="true" />
              Event #{event.id}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <HiCalendarDays
                className="text-lg text-brand-600"
                aria-hidden="true"
              />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950">
            {event.title}
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            {event.description || "No description provided."}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="flex gap-3 sm:col-span-2">
              <HiMapPin
                className="mt-0.5 shrink-0 text-xl text-brand-600"
                aria-hidden="true"
              />
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
              <HiUserCircle
                className="mt-0.5 shrink-0 text-xl text-brand-600"
                aria-hidden="true"
              />
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
              <HiClock
                className="mt-0.5 shrink-0 text-xl text-brand-600"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Record history
                </dt>
                <dd className="mt-1 text-sm text-slate-600">
                  Created {formatDate(event.createdAt, compactDateFormatter)}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
