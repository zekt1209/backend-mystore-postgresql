'use strict';

const { CUSTOMER_TABLE, CustomerSchema, Customer } = require('../models/customer.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
