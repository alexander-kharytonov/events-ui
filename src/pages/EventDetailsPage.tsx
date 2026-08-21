import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "@/api/events";
import { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import EventCard from "@/components/events/EventCard";
import FeedbackMessage from "@/components/FeedbackMessage";

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
    <>
      <div className="mb-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
        >
          <HiArrowLeft className="text-base" aria-hidden="true" />
          Back
        </button>
      </div>
      <EventCard event={event} preview />
    </>
  );
}
