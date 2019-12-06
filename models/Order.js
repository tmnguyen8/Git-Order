module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      Item: DataTypes.STRING,
      Cost: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      Status: DataTypes.STRING
    });
    return Order;
  };