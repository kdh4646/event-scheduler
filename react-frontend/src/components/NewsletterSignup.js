import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  //not initialize a route transition
  const fetcher = useFetcher();

  //return by the action or loader
  const { data, state } = fetcher;

  useEffect(() => {
    //state: idle, loading, submitting
    if (state === "idle" && data && data.message) {
      window.alert("Signup successful!");
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
