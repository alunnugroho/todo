'use strict';

const { hash } = require("../helpers/hash-helper");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dateNow = new Date();
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        username: 'Administrator',
        password: hash('password'),
        role: 'admin',
        createdAt: dateNow,
        updatedAt: dateNow
      }
    ]);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
