import { json, useLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useLoaderData();

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
