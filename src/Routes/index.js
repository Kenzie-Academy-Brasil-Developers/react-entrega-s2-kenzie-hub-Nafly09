import { Route, Switch } from "react-router";
import HomePage from "../Pages/Home";
import SignUp from "../Pages/SignUp";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default Routes;
