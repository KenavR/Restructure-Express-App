var fs = require('fs');

import * as FileSystemService from "./file-system.service";
import * as RequestUtils from "./request.utils";

export function initial(req, res, next) {
  console.log("Country of initial requests: " + req.body.country);

  fs.readFile(RequestUtils.getCountry(req) + ".json", "utf8", function(err, object) {
    if (err) {
    }

    if (object != null && object.length > 0) {
      console.log(JSON.parse(object).data);
      res.send(JSON.parse(object).data);
    } else {
      console.log("JSON file is empty");
      res.send("JSON file is empty");
    }
  });
}

export function registerPost(req, res, next) {
  fs.readFile(RequestUtils.getCountry(req) + ".json", "utf8", function(err, object) {
    if (err) {
    }
    try {
      jsonObject = JSON.parse(object);
    } catch (err) {}
    //incrementing the unique id items get
    try {
      var idNumb = jsonObject.data[jsonObject.data.length - 1].id + 1;
    } catch (err) {
      idNumb = 1;
    }
    var title = req.body.title;
    var text = req.body.text;
    var likes = 0;
    var postedBy = req.body.postedby;

    jsonObject.data.push({
      id: idNumb,
      title: title,
      text: text,
      likes: likes,
      postedby: postedBy
    });

    fs.writeFileSync(
      RequestUtils.getCountry(req) + ".json",
      JSON.stringify(jsonObject),
      "utf8",
      function(err) {
        if (err) {
        }
        console.log("Item with title " + title + " to JSON file");
      }
    );
  });

  console.log(
    "New post has been written. Country: " +
      req.body.country +
      " by username: " +
      req.body.postedby
  );
}

export function deletePost(req, res, next) {
  //console.log('Delete post req received '+req.body.title+ ' country '+req.body.country);

  fs.readFile(RequestUtils.getCountry(req) + ".json", "utf8", function(err, object) {
    if (err) {
    }
    if (object.length > 0) {
      var x = JSON.parse(object).data.filter(function(a) {
        return a.title != req.body.title && a.text != req.body.text;
      });
      if (x.length === 0) {
        FileSystemService.writeJson(
          req,
          res,
          JSON.stringify({
            data: []
          })
        );
      } else {
        FileSystemService.writeJson(
          req,
          res,
          JSON.stringify({
            data: x
          })
        );
      }
    }
  });
}
