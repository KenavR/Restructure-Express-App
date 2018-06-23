import * as Controllers from "./controllers";

function initRoutes(app) {
  app.post("/initialload", Controllers.initial);
  app.post("/registerpost", Controllers.registerPost);
  app.delete("/post", Controllers.deletePost);
}