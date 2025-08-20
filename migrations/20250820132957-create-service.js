'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      fileUrl: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('Can Drive', 'Normal', 'Need to Change'),
        allowNull: false,
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
    await queryInterface.dropTable('Services');
  },
};
