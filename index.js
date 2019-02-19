var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Resource = require('./api/models/resourceModel'), //created model loading here
  Transaction = require('./api/models/transactionModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ds237955.mlab.com:37955/checkit`, { useNewUrlParser: true }, null); 
// mongoose.connect(`mongodb://localhost:27017/checkit`, { useNewUrlParser: true }, null); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/checkitRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);