//normally this would now be under routes folder with an api
// Requiring our models
var db = require("../models");


module.exports = function(app) {
  //logging to find out where it is working
  //console.log("burgersController.js is listening")
  // Create all our routes and set up logic within those routes where required.
  
  // Index Page (render all burgers to browser)
  //had to change to "/index" to get this to work properly
  //Get route to get all the burgers
  app.get("/index", function(req, res) {

    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the Burgers as an argument inside of the callback function
      //have to create handlebars object in order for the html page to load anything other than a json array
      var hbsObject = {
        burgers: dbBurger
      };

      console.log(hbsObject);
      //must render here with "index" as part of the call and the handlebars object as the secondary item
      res.render("index", hbsObject);

    });
  });

  //POST route to create a burger
  app.post("/api/burgers", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger_name,
      // devoured: req.body.devoured

    }).then(function(dbBurger) {
    // We have access to the new Burger as an argument inside of the callback function
      console.log(dbBurger);

      //for some reason this does not have to be a res.redirect to get it to refresh the page with the correct information
      res.json(dbBurger);

    });
  });

//PUT route to update or change status on devour
  app.put("/api/burgers/:id", function(req, res) {

    db.Burger.update({
        devoured: true
      }, {
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        //console.log(dbBurger);
        //must use redirect here to get to update page with new information (if I was allowing user to do that)
        //res.redirect("/index");
        //res.json(dbBurger);
        res.end();

      });
  });

//DELETE route to toss the wrapper
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        //must use redirect here to get to destroy page with new information
        //res.redirect("/index");
        

      });
  });

}