//require our dependencies
var express = require ("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require ("body-parser");



//set up port
var PORT = process.env.PORT || 3000;

//expess app
var app = express();

//express Router
var router = express.Router();

require ("./config/routes")(router);

app.use(express.static ("/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use (router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(db, function (err){

    if(err) {
        console.log (err);
    }
    else {
        console.log ("mongoos connected");
    }
});

//listen on PORT
app.listen(PORT, function(){
console.log ("Listening on port: " + PORT);

});
