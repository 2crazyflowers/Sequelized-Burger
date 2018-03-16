module.exports = function(sequelize, DataTypes) {

  var Burger = sequelize.define("Burger", {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  });
  return Burger;
};

//do I need to have an id for this? or does it automatically do this?