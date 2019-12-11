module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    Name: DataTypes.STRING,
    Ingredients: DataTypes.STRING,
    Cost: DataTypes.INTEGER,
    URL: DataTypes.TEXT
  },
  {timestamps: false}
  );
  return Menu;
};
