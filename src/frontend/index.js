import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import ClientRoutes from "./routes/ClientRoutes";

import "./assets/app.styl";

const history = createBrowserHistory();

ReactDOM.hydrate(
  <Router history={history}>
    <ClientRoutes />
  </Router>,
  document.getElementById("root")
);
