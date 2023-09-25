import { Suspense } from "react";

//connect data from createBrowserRouter(), loader
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //data return by loader
  const { events } = useLoaderData();

  //load component first while waiting data
  //Await data, Suspense will show fallback
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //throw custom error
    // throw new Response(
    //   JSON.stringify({
    //     message: "Could not fetch events.",
    //   }),
    //   { status: 500 }
    // );

    //using json directly
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}

//loader
export function loader() {
  //load component first while waiting data
  return defer({ events: loadEvents() });
}
