'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT(1000)
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    cookbook_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cookbooks',
        key: 'id'
      }
    }
  }, {});
  Entry.associate = function (models) {
    Entry.belongsTo(models.User, { foreignKey: 'user_id' });
    Entry.belongsTo(models.Cookbook, { foreignKey: 'cookbook_id' });
  };

  return Entry;
};
