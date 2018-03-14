//normally this would now be under routes folder with an api
// Requiring our models
var db = require("../models");

module.exports = function(app) {

  // Create all our routes and set up logic within those routes where required.
  app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the Burgers as an argument inside of the callback function
      res.json(dbBurger);
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
    // We have access to the new Burger as an argument inside of the callback function
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
        res.json(dbBurger);
      });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbBurger) {
        res.json(dbBurger);
      });
  });

}