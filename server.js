var express     = require('express')
,   app         = express()
,   cons        = require('consolidate')
,   MongoClient = require('mongodb').MongoClient
,   assert      = require('assert');

app.engine('html', cons.swig);
app.set('view engine'), 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser()); //registers middleware, allows POST requests
app.use(app.router);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
  console.log(err.message);
  console.log(err.stack);
  res.status(500);
  res.render('error_template)', { error: err});
}
