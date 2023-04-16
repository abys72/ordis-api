function initialize(OrdisUser, Groups, RemoteHost) {
    Groups.belongsTo(OrdisUser, { foreignKey: 'user_id' });
    OrdisUser.hasMany(Groups, { foreignKey: 'user_id' });
  
    RemoteHost.belongsTo(OrdisUser, { foreignKey: 'user_id' });
    OrdisUser.hasMany(RemoteHost, { foreignKey: 'user_id' });
  }
  
  module.exports = {
    initialize,
  };
// try{
//   fs
//     .readdirSync(__dirname)
//     .filter(file => {
//       return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//       console.log(db);
//       const model = require(path.join(__dirname, file))(dbconnection, Sequelize.DataTypes);
//       db[model.name] = model;
//     });

//   Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });
// }catch(err){
//   console.log(err)
// }

// db.Groups.belongsTo(OrdisUser, { foreignKey: 'user_id' });
// db.OrdisUser.hasMany(Groups, { foreignKey: 'user_id' });

// db.RemoteHost.belongsTo(OrdisUser, { foreignKey: 'user_id' });
// db.OrdisUser.hasMany(RemoteHost, { foreignKey: 'user_id' });
// db.dbconnection = dbconnection;
// db.Sequelize = Sequelize;


