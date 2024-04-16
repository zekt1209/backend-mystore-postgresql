'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(PRODUCT_TABLE, 'categoryId', ProductSchema.categoryId);
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(PRODUCT_TABLE, 'categoryId');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
  }
};
