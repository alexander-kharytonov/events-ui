import { useEffect, useState } from "react";
import { getEvents } from "@/api/events";
import PagePlaceholder from "./PagePlaceholder";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  console.log("Fetched events:", events);

  return (
    <PagePlaceholder
      eyebrow="Discover"
      title="Events worth showing up for"
      description="The event list will live here. Browse upcoming meetups, workshops, and community gatherings."
    />
  );
}
