module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      Cost: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      Status: DataTypes.STRING,
      Menu_Id: DataTypes.INTEGER,
      Menu_Name: DataTypes.STRING
    });
    return Order;
  };