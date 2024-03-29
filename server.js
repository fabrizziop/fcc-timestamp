// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.route("/api/timestamp/:date_string?").get((req, res, next) => {
  if (req.params.date_string == undefined) {
    var newDate = new Date();
  } else if (isNaN(req.params.date_string) == false) {
    var newDate = new Date(parseInt(req.params.date_string)*1000);
  } else {
    var newDate = new Date(req.params.date_string);
  }
  if (isNaN(newDate.getTime()) == true) {
    res.json({
      "unix": null,
      "utc": "Invalid Date"
    });
  } else {
    res.json({
      "unix": newDate.getTime(),
      "utc": newDate.toUTCString()
    });
  };
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
