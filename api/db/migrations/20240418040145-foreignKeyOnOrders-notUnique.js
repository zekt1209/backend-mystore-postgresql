'use strict';

const { ORDER_TABLE, OrderSchema } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.changeColumn(ORDER_TABLE, 'customer_id', OrderSchema.customerId);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
    *
    * Example:
    * await queryInterface.dropTable('users');
    */
    await queryInterface.changeColumn(ORDER_TABLE, 'customer_id', {
      field: 'customer_id',
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
      references: {
        model: CUSTOMER_TABLE,
        key: 'id'
      },
      // Que sucede cuando se actualiza el registro en 'customer' con este ID? :
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
