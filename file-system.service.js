export function writeJson(req, res, data) {
  /**
   * Writing new data once we dropped object elements requested to drop by andorid user
   */

  fs.writeFileSync(getCountry(req) + '.json', data, 'utf8', function (err) {
      if (err) {}
  });
  /**
   * As soon as I write new data to a JSON file, I am sending new response of JSON data to andorid user
   */
  fs.readFile(getCountry(req) + '.json', 'utf8', function (err, object) {
      if (err) {}
      //console.log(JSON.parse(object).data);
      if (object.length > 0) {
          res.send(JSON.parse(object).data);
      } else {
          res.send("Nothing in JSON data");
      }
  });
}