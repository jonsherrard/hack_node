// Generated by IcedCoffeeScript 1.4.0a

/*
Module dependencies.
*/


(function() {
  var app, express, http, path, routes;

  express = require("express");

  routes = require("./routes");

  http = require("http");

  path = require("path");

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 25186);
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.favicon());
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express["static"](path.join(__dirname, "www")));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  app.get("/", routes.index);

  app.post('/login', routes.post_login);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express listening on port " + app.get("port"));
  });

}).call(this);
