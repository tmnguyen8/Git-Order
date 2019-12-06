var db = require("../models");

module.exports = function(app) {
  // Get all Menu
  app.get("/api/menu", function(req, res) {
    db.Menu.findAll({}).then(function(dbMenu) {
      res.json(dbMenu);
    });
  });
  app.get("/api/orders", function(req, res) {
    db.Order.findAll({}).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
  app.get("/api/orders/:id", function(req, res) {
    db.Order.findOne({}).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // Create a new Order
  app.post("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  // Delete an Menu by id
  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({ where: { id: req.params.id } }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });
};
