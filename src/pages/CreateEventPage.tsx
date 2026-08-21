import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCalendarDays,
  HiMapPin,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";
import { getProfile } from "@/api/auth";
import { createEvent, deleteEvent, getEvents } from "@/api/events";
import FeedbackMessage from "@/components/FeedbackMessage";

const initialForm = {
  title: "",
  description: "",
  date: "",
  location: "",
  latitude: "",
  longitude: "",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

export default function CreateEventPage() {
  const [form, setForm] = useState(initialForm);
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loadPage() {
      try {
        const [profileData, eventsData] = await Promise.all([
          getProfile(),
          getEvents("?limit=1000"),
        ]);

        if (!isCancelled) {
          setProfile(profileData);
          setEvents(
            (eventsData.results ?? []).filter(
              (event) => event.organizerId === profileData.id,
            ),
          );
        }
      } catch (requestError) {
        if (!isCancelled) {
          setError(requestError.message || "Unable to load your events.");
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadPage();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleChange = ({ target }) => {
    setForm((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        date: new Date(form.date).toISOString(),
        location: form.location.trim(),
        latitude: form.latitude === "" ? null : Number(form.latitude),
        longitude: form.longitude === "" ? null : Number(form.longitude),
        organizerId: profile.id,
      };
      const createdEvent = await createEvent(payload);

      setEvents((currentEvents) => [createdEvent, ...currentEvents]);
      setForm(initialForm);
      setMessage("Event created successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to create the event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (event) => {
    setDeleteError("");
    setDeletingEventId(event.id);

    try {
      await deleteEvent(event.id);
      setEvents((currentEvents) =>
        currentEvents.filter((currentEvent) => currentEvent.id !== event.id),
      );
    } catch (requestError) {
      setDeleteError(requestError.message || "Unable to delete the event.");
    } finally {
      setDeletingEventId(null);
    }
  };

  return (
    <section aria-labelledby="create-event-heading">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Event management
        </p>
        <h1
          id="create-event-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
        >
          Create an event
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Publish a new event and manage everything you have created.
        </p>
      </div>

      {isLoading ? (
        <div className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white" />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <form
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold text-slate-950">Event details</h2>
            <p className="mt-2 text-sm text-slate-500">
              Fields marked with an asterisk are required.
            </p>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Title *
                </span>
                <input
                  className={inputClassName}
                  name="title"
                  value={form.title}
                  minLength={3}
                  maxLength={255}
                  placeholder="Community meetup"
                  required
                  onChange={handleChange}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Description
                </span>
                <textarea
                  className={`${inputClassName} min-h-32 resize-y`}
                  name="description"
                  value={form.description}
                  maxLength={5000}
                  placeholder="Tell people what to expect..."
                  onChange={handleChange}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Date and time *
                  </span>
                  <input
                    className={inputClassName}
                    type="datetime-local"
                    name="date"
                    value={form.date}
                    required
                    onChange={handleChange}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Location *
                  </span>
                  <input
                    className={inputClassName}
                    name="location"
                    value={form.location}
                    maxLength={255}
                    placeholder="Berlin, Germany"
                    required
                    onChange={handleChange}
                  />
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700">
                  Map coordinates (optional)
                </legend>
                <div className="mt-2 grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="sr-only">Latitude</span>
                    <input
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      type="number"
                      name="latitude"
                      value={form.latitude}
                      min="-90"
                      max="90"
                      step="any"
                      placeholder="Latitude"
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <span className="sr-only">Longitude</span>
                    <input
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
                      type="number"
                      name="longitude"
                      value={form.longitude}
                      min="-180"
                      max="180"
                      step="any"
                      placeholder="Longitude"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </fieldset>
            </div>

            <div className="mt-6 space-y-3">
              {error && <FeedbackMessage>{error}</FeedbackMessage>}
              {message && (
                <FeedbackMessage type="success">{message}</FeedbackMessage>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
              disabled={isSubmitting || !profile}
            >
              <HiPlus className="text-xl" aria-hidden="true" />
              {isSubmitting ? "Creating..." : "Create event"}
            </button>
          </form>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Your events
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {events.length} {events.length === 1 ? "event" : "events"}
                </p>
              </div>
              <HiCalendarDays
                className="text-3xl text-brand-600"
                aria-hidden="true"
              />
            </div>

            {deleteError && (
              <div className="mt-5">
                <FeedbackMessage>{deleteError}</FeedbackMessage>
              </div>
            )}

            {events.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center">
                <p className="font-medium text-slate-700">
                  No events created yet
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Your first event will appear here.
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {events.map((event) => (
                  <li key={event.id}>
                    <div className="rounded-2xl border border-slate-200 transition hover:border-brand-600/30 hover:bg-brand-50/50">
                      <Link
                        to={`/events/${event.id}`}
                        className="group block p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                            {event.title}
                          </h3>
                          <HiArrowRight
                            className="mt-1 shrink-0 text-brand-600"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <HiCalendarDays
                            className="shrink-0"
                            aria-hidden="true"
                          />
                          {formatDate(event.date)}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                          <HiMapPin className="shrink-0" aria-hidden="true" />
                          <span className="truncate">{event.location}</span>
                        </p>
                      </Link>
                      <div className="border-t border-slate-200 px-4 py-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700 disabled:cursor-wait disabled:opacity-50"
                          disabled={deletingEventId === event.id}
                          onClick={() => handleDelete(event)}
                        >
                          <HiTrash className="text-base" aria-hidden="true" />
                          {deletingEventId === event.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
