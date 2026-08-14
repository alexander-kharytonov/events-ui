import PagePlaceholder from "./PagePlaceholder";

export default function HomePage() {
  return (
    <PagePlaceholder
      eyebrow="Discover"
      title="Events worth showing up for"
      description="The event list will live here. Browse upcoming meetups, workshops, and community gatherings."
    />
  );
}

// return (
//     <main className="app">
//       <Header />
//       <Hero />
//       {selectedEventTitle && (
//         <p className="event-stats">Last saved: {selectedEventTitle}</p>
//       )}
//    
//       {hasPagination && (
//         <div className="pagination">
//           <button
//             type="button"
//             disabled={!canGoPrevious || isLoading}
//             onClick={() => setPage((currentPage) => currentPage - 1)}
//           >
//             Previous
//           </button>
//           <span>
//             Page {page} of {totalPages}
//           </span>
//           <button
//             type="button"
//             disabled={!canGoNext || isLoading}
//             onClick={() => setPage((currentPage) => currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//       <AddEventForm onAddEvent={handleAddEvent} />
//     </main>
//   );
