var express = require("express");
var mysql = require("mysql");

import { configureServer } from "./configuration";
import { initRoutes } from "./routes";

function run(port) {
  var app = express();

  configureServer(app);
  initRoutes(app);

  app.listen(port);
  console.log(`Script started on port ${port}`);
}

export const Server = {
  run
};
