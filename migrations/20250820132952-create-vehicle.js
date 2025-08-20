'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slNo: {
        type: Sequelize.STRING,
      },
      vehicleNumber: {
        type: Sequelize.STRING,
      },
      driverId: {
        type: Sequelize.STRING,
      },
      insurance: {
        type: Sequelize.DATE,
      },
      permit: {
        type: Sequelize.DATE,
      },
      pollution: {
        type: Sequelize.DATE,
      },
      fitness: {
        type: Sequelize.DATE,
      },
      totalKm: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Vehicles');
  },
};
