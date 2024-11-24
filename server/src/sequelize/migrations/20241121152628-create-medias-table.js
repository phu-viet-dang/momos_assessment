"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("medias", {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      url: {
        type: Sequelize.DataTypes.TEXT,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
      },
      domain: {
        type: Sequelize.DataTypes.TEXT,
      },
      metadata: {
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
      tableName: "medias",
    });
  },
};
