import { useParams } from "react-router-dom";
import PagePlaceholder from "./PagePlaceholder";

export default function EventDetailsPage() {
  const { eventId } = useParams();

  return (
    <PagePlaceholder
      eyebrow={`Event ${eventId}`}
      title="Event details"
      description="The full event description, date, location, and organizer information will appear here."
    />
  );
}
