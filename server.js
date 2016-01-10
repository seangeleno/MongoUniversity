var express     = require('express')
,   app         = express()
,   cons        = require('consolidate')
,   MongoClient = require('mongodb').MongoClient
,   assert      = require('assert');

app.engine('html', cons.nunjucks);
app.set('view engine'), 'html');
app.set('views', __dirname + '/views/html');
app.use(express.bodyParser()); //registers middleware, allows POST requests
app.use(app.router);


MongoClient.connect('mongodb://localhost:27017/imdb', function( err, db ) {

  assert.equal( null, err );
  console.log("Successfully connected to MongoDB - oh yeah!");

  app.get('/', function( req, res ){

    db.collection('movies').find({}).toArray(function( err, docs){
      res.render('movies', { 'movies': docs } );
    });

  });

  app.use(function( req, res ){
    res.sendStatus(404);
  });

  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Express serer listening on port %s. ' + port);
  });

});
