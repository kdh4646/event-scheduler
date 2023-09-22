//connect data from createBrowserRouter(), loader
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //data return by loader
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;

//loader
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //...
  } else {
    const resData = await response.json();

    return resData.events;
  }
}
