"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      urls_tracking: {
        type: Sequelize.DataTypes.JSON,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable({
      tableName: "users",
    });
  },
};
