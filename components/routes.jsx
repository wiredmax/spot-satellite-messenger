import React from "react";
import {DefaultRoute, NotFoundRoute, Route} from "react-router";

module.exports = [
  <Route name="app" path="/" handler={require("./App.jsx")}>
    <Route name="about" handler={require("./About.jsx")} />
    <DefaultRoute name="home" handler={require("./Home.jsx")} />
  </Route>
]
