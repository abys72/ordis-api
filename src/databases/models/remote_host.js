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
        allowNull: false,
        references: {
            model: 'ordis_user',
            key: 'user_id',
        }
    },
    protocol: {
        type: Sequelize.STRING(5),
        allowNull: true
    },
    host: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    user: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: true
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
});


module.exports = RemoteHost;