var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');

//Set View Engine
app.set("view engine", 'ejs');

//Set Up static content
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));
app.set('views', __dirname + '/public/views');

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Set up route for root page
router.route('/')
  .get(function(req, res){
    res.status(200).render("index");
  });

app.use(router);

port = process.env.PORT || 1234;
app.listen(port);
console.log("Listening on port", port);