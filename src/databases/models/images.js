const Sequelize = require("sequelize");
const dbconnection  = require('../postgres');

const Images = dbconnection.define('images',{
    image_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    version: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    image_id_reference: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    url_image: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'images',
    timestamps: false,
  });

module.exports = Images;