'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
