var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://react:react@ds053429.mongolab.com:53429/react-tut');

var Comment = require('./app/models/comment.js');

//Set View Engine
app.set("view engine", 'ejs');

//Set Up static content
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));
app.set('views', __dirname + '/public/views');


//Set up route for root page
router.route('/')
  .get(function(req, res){
    res.render("index");
    Comment.find(function(error, data){
      if(error){console.log('error');}
    });
  })
  .post(function(req, res){
    console.log(req.body);
    var newComment = new Comment();
    newComment.author = req.body.author;
    newComment.comment = req.body.comment;
    newComment.save(function(error){
      if(error){res.send(error);}
      res.status(201).json({message: 'comment successfully created'+ req.body.author+ req.body.comment});
    });
  });

//Set up API route
var apiRouter = express.Router();

apiRouter.route('/')
  .get(function(req, res){
    Comment.find(function(error, data){
      if(error){console.log('error no data');}
      res.json(data);
    });
  })
  .post(function(req, res){
    console.log(req.body);
    var newComment = new Comment();
    newComment.author = req.body.author;
    newComment.comment = req.body.comment;
    newComment.save(function(error){
      if(error){res.send(error);}
      res.status(201).json({message: 'comment successfully created'+ req.body.author+ req.body.comment});
    });
  });


app.use('/', router);
app.use('/api', apiRouter);
port = process.env.PORT || 1234;
app.listen(port);
console.log("Listening on port", port);