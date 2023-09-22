import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  //let know the status: currently in an active transition or not
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
