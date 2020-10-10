import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../App";

const ClientRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default ClientRoutes;