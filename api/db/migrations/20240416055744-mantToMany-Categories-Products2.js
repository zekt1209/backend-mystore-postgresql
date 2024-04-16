'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.changeColumn(PRODUCT_TABLE, 'categoryId', ProductSchema.categoryId);
    await queryInterface.removeColumn(PRODUCT_TABLE, 'categoryId');
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
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
