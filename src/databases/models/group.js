const Sequelize = require("sequelize");
const dbconnection  = require('../postgres');

const Groups = dbconnection.define('groups',{
    groups_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    groups_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'groups',
});

module.exports = Groups;