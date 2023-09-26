import { Suspense } from "react";
import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  /*
    take routeId as an argument (declared in App.js)
    get access to the higher level loader from a router that doesn't have loader
  */
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

//helper function
async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { meesage: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();

    return resData.event;
  }
}

//helper function for events
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
    //due to defer this doesn't work
    //return response;

    const resData = await response.json();

    return resData.events;
  }
}

export async function loader({ requestm, params }) {
  //allow to get access to dynamic segements (eventId)
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ meesage: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
}
