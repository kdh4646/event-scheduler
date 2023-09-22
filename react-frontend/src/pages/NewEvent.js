import { json, redirect } from "react-router-dom";

import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;

//action() to fetch data
export async function action({ request, params }) {
  //get data from "Form"
  const data = await request.formData();

  //get names from input tag
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { state: 500 });
  }

  //redirect to different page
  return redirect("/events");
}
