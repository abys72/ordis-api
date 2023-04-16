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

function initializeDatabase() {
    const Groups = require("./models/group");
    const RemoteHost = require("./models/remote_host");
    const OrdisUser = require("./models/user");
    const Images = require("./models/images");
    const Permission = require("./models/permissions");
    const relationships = require("./databaseReferences");
  
    Groups.sync().then(() => {
      console.log('Groups table created successfully.');
    }).catch((error) => {
      console.error(`Error creating groups table: ${error}`);
    });
    OrdisUser.sync().then(() => {
      console.log('User table created successfully.');
    }).catch((error) => {
      console.error(`Error creating ordis_user table: ${error}`);
    });
    RemoteHost.sync().then(() => {
      console.log('RemoteHost table created successfully.');
    }).catch((error) => {
      console.error(`Error creating remote_host table: ${error}`);
    });
    Permission.sync().then(() => {
      console.log('Permission table created successfully.');
    }).catch((error) => {
      console.error(`Error creating permission table: ${error}`);
    });
    
    Images.sync().then(() => {
      console.log('Image table created successfully.');
    }).catch((error) => {
      console.error(`Error creating image table: ${error}`);
    });
    
  
    relationships.initialize(OrdisUser, Groups, RemoteHost);
  }
module.exports = sequalize;
