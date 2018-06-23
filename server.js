var express = require('express');
var mysql = require('mysql');

import {configureServer} from "./configuration";
import {initRoutes} from "./routes";

var app = express();

configureServer(app);
initRoutes(app);

app.listen(1111);
console.log('Script started on port 1111');

var jsonObject = {
    data: []
};

