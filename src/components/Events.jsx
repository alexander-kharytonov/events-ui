import { useEffect, useState } from "react";

const [events, setEvents] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const [totalResults, setTotalResults] = useState(0);//?

// Jeder Request bekommt einen eigenen Controller.
    // Cleanup kann genau diesen Request abbrechen.
const controller = new AbortController();


async function fetchEvents(url) {
	try {
        setIsLoading(true);
        setErrorMessage("");

        //?// const apiKey = import.meta.env.VITE_OMDB_API_KEY;

        // if (!apiKey) {
        //   setEvents([]);
        //   setErrorMessage("Missing OMDb API key.");
        //   setTotalResults(0);
        //   return;
        // }

		const response = await fetch("http://localhost:3001");
      // {
      //   signal: controller.signal,
      // }, 
		const data = await response.json();

        
        if (data.Response === "False") {
          
          setEvents([]);
          setErrorMessage(data.Error);
          setTotalResults(0);
          return;
        } 

        // Die API-Daten werden in unser eigenes Event-Modell? übertragen. ggf. trim()
        const apiEvents = data.Search.map((event) => {
          return {
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            latitude: event.latitude,
            longitude: event.longitude,
            organizerid: event.organizerId,
            createdat: event.createdAt,
            updatedAt: event.updatedAt,
          };
        }); 
        
        setEvents(apiEvents);
        //  // totalResults ist ein String in der OMDb Response. 
        // setTotalResults(Number(data.totalResults));?????? gibts dies in der event-api??
    } catch (error) {
        if (error.nme === "AbortError")
            return;
            }
    
        setErrorMessage("Could not load events.");

      finally {
            if (!controller.signal.aborted) {
              setIsLoading(false);
              }
            }        
      } 

 fetchEvents();

export default fetchEvents;

//    function handleAddEvent(event) {
//     if (event.title.trim() === "") {
//       return;
//     }
//ggf.trim()
//     const newEvent = {
//       id: event.id,
//        title: event.title.trim(),
//       description: event.description.trim(),
//       date: event.date,
//       location: event.location,
//       latitude: event.latitude,
//       longitude: event.longitude,
//       organizerId: event.organizerId,
//        createdat: event.createdAt,
//          updatedAt: event.updatedAt,
//     };

//     setEvents((currentEvents) => {
//       return [...currentEvents, newEvent];
//     });
//   }


// function handleSaveEvent(eventId) {
//     const selectedEvent = events.find((event) => event.id === eventId);

//     setSelectedEventTitle(selectedEvent.title);
//   }

//   function handleToggleWatched(eventId) {
//     setEvents((currentEvents) => {
//       return currentEvents.map((event) => {
//         if (event.id !== eventId) {
//           return event;
//         }

//         return {
//           ...event,
//           watched: !event.watched,
//         };
//       });
//     });
// }
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