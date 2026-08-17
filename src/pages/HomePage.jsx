import { useEffect, useState } from "react";
import { getEvents } from "@/api/events";
import Events from "@/components/Events";

export default function HomePage() {
  
  return (
    <Events />
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
