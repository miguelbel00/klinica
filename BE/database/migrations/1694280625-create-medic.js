'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medics', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resume: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false
      },
      profesionalid: {
        type: Sequelize.BIGINT,
      },
      nid: {
        type: Sequelize.BIGINT
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medics');
  }
};