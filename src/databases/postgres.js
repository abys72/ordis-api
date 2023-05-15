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
        dialectOptions: {
        },
        schema: 'public',
        logging: false
    }
);

sequalize.authenticate().then(() => {
    console.log(`Connected to database ${process.env.DATABASE}`);
    initializeDatabase()
  }).catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });

async function initializeDatabase() {
    const Groups = require("./models/group");
    const RemoteHost = require("./models/remote_host");
    const OrdisUser = require("./models/user");
    const Images = require("./models/images");
    const Permission = require("./models/permissions");
    const relationships = require("./databaseReferences");
    try{
      await Images.sync();
      console.log('Image table created successfully.');
  
      await Groups.sync();
      console.log('Groups table created successfully.');
  
      await Permission.sync();
      console.log('Permission table created successfully.');
  
      await OrdisUser.sync();
      console.log('User table created successfully.');
  
      await RemoteHost.sync();
      console.log('RemoteHost table created successfully.');
  
      relationships.initialize(OrdisUser, Groups, RemoteHost);
      relationships.insertData(Groups);
    } catch (error) {
      console.error(`Error initializing database: ${error}`);
    }
  }
    
module.exports = sequalize;
