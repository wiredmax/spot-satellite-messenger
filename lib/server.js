import express from "express";
import morgan from "morgan";
import React from "react";
import Router from "react-router";

import routerRoutes from "../components/routes.jsx";

const app = express();
app.use(morgan("dev"));

require("./routes")(app);

app.use((req, res) => {
  Router.run(routerRoutes, req.path, (Root, state) => {
    res.send("<!DOCTYPE html>" + React.renderToString( <Root/> ));
  });
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
