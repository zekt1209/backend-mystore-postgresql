'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'phone', {
      type:Sequelize.STRING
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'phone', {
      type:Sequelize.NUMBER
    });

  }
};
