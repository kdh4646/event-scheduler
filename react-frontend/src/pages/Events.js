//connect data from createBrowserRouter(), loader
import { useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  //data return by loader
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;
