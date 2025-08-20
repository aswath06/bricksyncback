'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Refuels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      volume: {
        type: Sequelize.FLOAT,
      },
      lastKm: {
        type: Sequelize.INTEGER,
      },
      mileage: {
        type: Sequelize.FLOAT,
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vehicles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Refuels');
  },
};
