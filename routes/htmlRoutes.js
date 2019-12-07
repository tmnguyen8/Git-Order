var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Menu.findAll({}).then(function(dbMenus) {
      res.render("index", {
        msg: "Welcome!",
        Menus: dbMenus
      });
    });
  });

  // Load Order Mangement Page
  app.get("/production", function(req, res) {
    db.Order.findAll({}).then(function(dbOrder) {
      res.render("production", {
        msg: "Welcome!",
        Menus: dbOrder
      });
    });
  });

  // Load Menu page and pass in an Menu by id
  app.get("/Menu/:id", function(req, res) {
    db.Menu.findOne({ where: { id: req.params.id } }).then(function(dbMenu) {
      res.render("Menu", {
        Menu: dbMenu
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
