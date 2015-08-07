import React from "react";
import Router from "react-router";
const {DefaultRoute, Route, Routes} = Router;

const routes = require("./routes.jsx");

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
