import PagePlaceholder from "./PagePlaceholder";

export default function CreateEventPage() {
  return (
    <PagePlaceholder
      eyebrow="Protected page"
      title="Create an event"
      description="The event creation form will be available here for authenticated users."
    />
  );
}



// import EventCard from "./EventDetailsPage.jsx";

// function EventList({ events, onSaveEvent, onToggleWatched }) {
//   // im Falle einer leeren Liste können wir die Funktion frühzeitig beenden
//   // und eine Nachricht anzeigen
//   if (events.length === 0) {
//     return <p>No events found.</p>;
//   }

//   return (
//     <section className="movie-grid">
//       {events.map((event) => (
//         <EventCard
//           key={event.id}
//           event={event}
//           onSaveEvent={onSaveEvent}
//           onToggleWatched={onToggleWatched}
//         />
//       ))}
//     </section>
//   );
// }

// export default EventList;

