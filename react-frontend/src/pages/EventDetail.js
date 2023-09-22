import { json, useRouteLoaderData, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  /*
    take routeId as an argument (declared in App.js)
    get access to the higher level loader from a router that doesn't have loader
  */
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ requestm, params }) {
  //allow to get access to dynamic segements (eventId)
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { meesage: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return response;
  }
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
