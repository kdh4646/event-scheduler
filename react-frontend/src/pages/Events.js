//connect data from createBrowserRouter(), loader
import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //data return by loader
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

//loader
export async function loader() {
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
