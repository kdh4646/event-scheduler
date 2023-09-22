import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  //handling error based on throw Response()
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  //received status from Response()
  if (error.status === 500) {
    //data: object from Response() (JSON.stringify(...))
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resources or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
