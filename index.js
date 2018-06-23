///////////////////////CONFIG///////////////////////
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(1111);
console.log('Script started on port 1111');

var jsonObject = {
    data: []
};
///////////////////////CONFIG///////////////////////

///////////////////////INITIAL LOAD INTO APP///////////////////////
app.post('/initialload', function (req, res, next) {

    console.log('Country of initial requests: ' + req.body.country);

    fs.readFile(getCountry(req) + '.json', 'utf8', function (err, object) {
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
});
///////////////////////INITIAL LOAD INTO APP///////////////////////

///////////////////////USED TO REGISTER POST///////////////////////
app.post('/registerpost', function (req, res, next) {

    fs.readFile(getCountry(req) + '.json', 'utf8', function (err, object) {
        if (err) {}
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
            "id": idNumb,
            "title": title,
            "text": text,
            "likes": likes,
            "postedby": postedBy
        });

        fs.writeFileSync(getCountry(req) + '.json', JSON.stringify(jsonObject), 'utf8', function (err) {
            if (err) {}
            console.log("Item with title " + title + " to JSON file");

        });
    });

    console.log('New post has been written. Country: ' + req.body.country + ' by username: ' + req.body.postedby);

});
///////////////////////USED TO REGISTER POST///////////////////////

///////////////////////USED TO DELETE POST///////////////////////
app.post('/deletepost', function (req, res, next) {

    //console.log('Delete post req received '+req.body.title+ ' country '+req.body.country);

    fs.readFile(getCountry(req) + '.json', 'utf8', function (err, object) {
        if (err) {}
        if (object.length > 0) {
            var x = JSON.parse(object).data.filter(function (a) {
                return a.title != req.body.title && a.text != req.body.text;
            });
            if (x.length === 0) {
                writeJson(req, res, JSON.stringify({
                    "data": []
                }));
            } else {
                writeJson(req, res, JSON.stringify({
                    "data": x
                }));

            }
        }
    });

});

function writeJson(req, res, data) {
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
///////////////////////USED TO DELETE POST///////////////////////






////////////////////////////GLOBAL FUNCTIONS//////////////////////////////
function getCountry(req) {
    return req.body.country;
};
////////////////////////////GLOBAL FUNCTIONS//////////////////////////////