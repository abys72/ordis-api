function initialize(OrdisUser, Groups, RemoteHost) {
    Groups.hasMany(OrdisUser, { foreignKey: 'id_groups' });
    //OrdisUser.hasMany(Groups, { foreignKey: 'user_id' });

    OrdisUser.hasMany(RemoteHost, { foreignKey: 'user_id' });
}


function insertData(Groups) {
  Groups.findAll().then(groups => {
    if (groups.length === 0) {
      const data = [{groups_name: 'admin'},{groups_name: 'user'},
                    {groups_name: 'edit'}, {groups_name: 'view'}];
      Groups.bulkCreate(data).then(() => {
        console.log("Group data inserted");
      })
      .catch(err => {
        console.log("Error inserting data", err);
      });
    }
  })
}
  
module.exports = {  initialize, insertData };



