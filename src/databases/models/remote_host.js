const Sequelize = require("sequelize");
const dbconnection  = require('../postgres');

const RemoteHost = dbconnection.define('remote_host',{
    id_host: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    host_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    protocol: {
        type: Sequelize.STRING(5),
        allowNull: true
    },
    host: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    port: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ca: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    cert: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    private_key : {
        type: Sequelize.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
    tableName: 'remote_host',
    schema: 'docker'
});

module.exports = RemoteHost;