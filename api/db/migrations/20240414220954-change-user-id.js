'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.STRING,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
    //   allowNull: false,
    //   type:Sequelize.NUMBER
    // });
  }
};
