'use strict';

const { ORDERS_PRODUCTS_TABLE, OrdersProductsSchema, OrdersProducts } = require('../models/orders-products.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrdersProductsSchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
    */
   await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
  }
};
