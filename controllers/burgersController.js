//normally this would now be under routes folder with an api
// Requiring our models
var db = require("../models");


module.exports = function(app) {
  //logging to find out where it is working
  //console.log("burgersController.js is listening")
  // Create all our routes and set up logic within those routes where required.
  
  // Index Page (render all burgers to browser)
  app.get("/index", function(req, res) {

    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the Burgers as an argument inside of the callback function
      //create handlebars object
      var hbsObject = {
        burgers: dbBurger
      };

      console.log(hbsObject);
      res.render("index", hbsObject);

    });
  });

  app.post("/api/burgers", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured

    }).then(function(dbBurger) {
    // We have access to the new Burger as an argument inside of the callback function
      console.log(dbBurger);
      res.json(dbBurger);

    });
  });

  app.put("/api/burgers", function(req, res) {

    db.Burger.update({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
      }, {
        where: {
          id: req.body.id
        }
      }).then(function(dbBurger) {
        //console.log(dbBurger);
        res.redirect("/index");
      });
  });


  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        res.redirect("/index");
      });
  });

}