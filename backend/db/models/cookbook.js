'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cookbook = sequelize.define("Cookbook", {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {});
  Cookbook.associate = function (models) {
    Cookbook.belongsTo(models.User, { foreignKey: 'user_id' });
    Cookbook.hasMany(models.Entry, { foreignKey: 'cookbook_id' });
  };
  return Cookbook;
};
