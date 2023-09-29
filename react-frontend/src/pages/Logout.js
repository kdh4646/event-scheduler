import { redirect } from "react-router-dom";

//remove token
export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}
