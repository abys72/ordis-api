'use strict';
require("dotenv").config()
const { Sequelize } = require("sequelize");

const sequalize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.PASSWORD_USER,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
        protocol: 'postgres',
        schema: 'docker',
        dialectOptions: {
        },
    }
);

sequalize.authenticate().then(() => {
    console.log('Connected to database');
  }).catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });
  
module.exports = sequalize;
