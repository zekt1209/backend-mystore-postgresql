'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(USER_TABLE, 'user_id');

  }
};
