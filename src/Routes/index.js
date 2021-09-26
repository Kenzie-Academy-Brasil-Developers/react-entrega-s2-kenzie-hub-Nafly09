import { Route, Switch } from "react-router";
import HomePage from "../Pages/Home";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
