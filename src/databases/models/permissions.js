const Sequelize = require("sequelize");
const dbconnection  = require('../postgres');


const Permissions = dbconnection.define('permissions', {
    permission_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    permission_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    administration: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    create_resource: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    delete_resources: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    access_resource: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    groups_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'groups_id',
      }
    }
}, {
    tableName: 'permissions',
    timestamps: false,
});


module.exports = Permissions;
