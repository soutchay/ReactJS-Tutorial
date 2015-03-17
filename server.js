var express = require('express');
var app = express();

var router = express.Router();

//set up static content
app.use(express.static(__dirname + '/views'));



//Set up route for root page
router.route('/')
  .get(function(req, res){
    res.status(200).render("index.html");
  });

port = process.env.PORT || 1234;
app.listen(port);
console.log("Listening on port", port);