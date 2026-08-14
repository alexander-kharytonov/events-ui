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

// function EventCard({ event, onSaveEvent, onToggleWatched }) {
//   function handleSaveClick() {
//     onSaveEvent(event.id);
//   }

//   function handleToggleWatchedClick() {
//     onToggleWatched(event.id);
//   }

//   return (
//     <article
//      // ?className={`event-card ${event.watched ? "event-card--watched" : ""}`}
//     >
//       {event.poster && event.poster !== "N/A" && (
//         <img
//           src={event.poster}
//           alt={event.title}
//           className="event-card__poster"
//         />
//       )}
//       <p className="event-card__meta">
//         {event.date} ยท {event.location}
//       </p>
//       <h2>{event.title}</h2>
   
//       <div className="event-card__actions">
//         <button onClick={handleSaveClick}>Save movie</button>
//  //    ?   <button onClick={handleToggleWatchedClick}>Toggle watched</button>
//       </div>
//     </article>
//   );
// }

// export default EventCard;