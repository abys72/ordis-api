const dockerode = require('dockerode');
const RemoteHost = require('../databases/models/remote_host')
const { Op } = require('sequelize');
const dockerHostCache = require('../caches/dockerHostCache');

async function connectDockerHost(req, res) {
  try{
    const { hostid, scoketPath } = req.body;
    const user_identification = req.data.userId;
    const scoket = scoketPath || '/var/run/docker.sock';
    if (!hostid || hostid == null){
      var err = {
        error: 400, 
        hostid : "integer",
        optional : {
          scoketPath: "path"
        }
      }
      res.status(400).send({
        status: 400,
        message: err
      })
      return;
    }
    const remoteDataHost = await RemoteHost.findOne({
      where: {
        [Op.and]: [
          { user_id: user_identification },
          { id_host: hostid }
        ]
      }
    });
    if (!remoteDataHost || remoteDataHost == null){
      console.log("h2")
      res.status(400).send({
        status: 400,
        message: 'Host not found'
      });
      return;
    }
    const dockerHosts = 
      {
        scoketPath: scoket,
        host: remoteDataHost.host,
        protocol: remoteDataHost.protocol,
        port: remoteDataHost.port,
        ca: remoteDataHost.ca,
        cert: remoteDataHost.cert,
        key: remoteDataHost.key,
        checkServerIdentity: false
      };

    const dockerConnections =new dockerode(dockerHosts);
    try {
      dockerConnections.ping(function(err, data) {
        if(err){
          res.status(400).send(`Error conection: ${err}`);
        } else{
          res.status(200).send(data);
        }
      });
      dockerHostCache.cacheDockerConnection(user_identification, dockerConnections);
  } catch (err) {
    res.status(400).send(`Error establishing connection: ${err.message}`);  
  }
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = connectDockerHost;