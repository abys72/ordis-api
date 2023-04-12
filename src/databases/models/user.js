const Sequelize = require("sequelize");
const dbconnection = require('../postgres');
const OrdisUser = dbconnection.define('ordis_user', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    user_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    surname: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    credential: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    register_location: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    id_groups: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'ordis_user',
    schema: 'docker'
  });


module.exports = OrdisUser;
