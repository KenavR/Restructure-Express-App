var bodyParser = require('body-parser');

export function configureServer(app) {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
}
