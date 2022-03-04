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
  
  const today = new Date();
  let yesterday = new Date();
  
  yesterday.setDate(today.getDate() - 1);
  
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'wrong date format'
        },
       isAfter: yesterday.toISOString().slice(0, 10)
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
