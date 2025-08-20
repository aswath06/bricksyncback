'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      userid: { type: Sequelize.STRING, allowNull: false, unique: true },
      name: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      userrole: { type: Sequelize.INTEGER },
      phone: { type: Sequelize.STRING },
      balance: { type: Sequelize.FLOAT, defaultValue: 0 },
      advance: { type: Sequelize.FLOAT, defaultValue: 0 },
      dateOfBirth: { type: Sequelize.DATEONLY },
      gender: { type: Sequelize.ENUM('Male','Female','Other'), allowNull: true },
      statements: { type: Sequelize.JSON, defaultValue: [] },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
