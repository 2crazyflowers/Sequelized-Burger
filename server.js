// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
//adding __dirname + to public is what allowed me access to the images in assets/img folder
//having errors sequelizing so changing original code:
app.use(express.static(__dirname + "/public"));
//now having new issues with html/javascript not listening so bringing above code back
// app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");
//sets main.handlebars as the default layout and our view engine as handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

var handlebars = require("handlebars");
handlebars.registerHelper("json", context => JSON.stringify(context));

//I am getting an error at the require line below, but I think it has more to do with the handlebars here
app.set("view engine", "handlebars");

handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("====================");
        console.log(optionalValue);
    }
});

// Routes
// =============================================================
require("./controllers/burgersController.js")(app);



//do not use .sync({ force: true }) unless you want it to always want to delete your table every time this file is loaded 
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});