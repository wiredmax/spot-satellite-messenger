import _ from "lodash";
import path from "path";
import fs from "fs";
import express from "express";
import morgan from "morgan";
import React from "react";
import Router from "react-router";

import routerRoutes from "../components/routes.jsx";

// The top-level React component + HTML template for it
const templateFile = path.join(__dirname, "..", "templates", "index.html");
const template = _.template(fs.readFileSync(templateFile, "utf8"));

const app = express();
app.use(morgan("dev"));

require("./routes")(app);

app.use((req, res) => {
  const data = {
    title: "",
    description: "",
    css: "",
    body: "",
  };

  Router.run(routerRoutes, req.path, (Root, state) => {
    data.body = React.renderToString(<Root/>)
    const html = template(data);
    res.status(200).send(html);
  });
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
