import { Route, Switch } from "react-router";
import Login from "../Pages/Login";
import HomePage from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import { useEffect, useState } from "react";

function Routes() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@kenzieHub:token");

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Switch>
      <Route exact path="/">
        <HomePage authenticated={authenticated} />
      </Route>
      <Route path="/signup">
        <SignUp authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  );
}

export default Routes;
