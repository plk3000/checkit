console.log(`check-it Copyright (C) 2019 plk3000
This program comes with ABSOLUTELY NO WARRANTY; for details type \`show w'.
This is free software, and you are welcome to redistribute it
under certain conditions; type \`show c' for details.`)

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Resource = require('./api/models/resourceModel'), //created model loading here
  Transaction = require('./api/models/transactionModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/checkit', { useNewUrlParser: true }, null);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/checkitRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);