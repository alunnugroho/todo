'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require('../helpers/hash-helper');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, { foreignKey: 'UserId' });
    }
  }
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'wrong email format'
        },
        notNull: {
          msg: 'email cannot be empty'
        },
        notEmpty: {
          msg: 'email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be empty'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        },
        moreThanFiveCharacters(value) {
          if (value.length < 5) {
            throw new Error('password cannot be less than five characters');
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'username cannot be empty'
        },
        notEmpty: {
          msg: 'username cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'role cannot be empty'
        },
        notEmpty: {
          msg: 'role cannot be empty'
        },
        isIn: {
          args: [['admin', 'user']],
          msg: 'invalid role'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hash(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
