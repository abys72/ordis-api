const dockerode = require('dockerode');
const RemoteHost = require('../databases/models/remote_host')
const { Op } = require('sequelize');
const dockerHostCache = require('../caches/dockerHostCache');

async function connectDockerHost(req, res) {
  try{
    const { hostid, scoketPath } = req.body;
    const user_identification = req.data.userId;
    const scoket = scoketPath || '/var/run/docker.sock';
    if (!hostid || !user_identification){
      var err = {
        error: 400, 
        hostid : "integer",
        optional : {
          scoketPath: "path"
        }
      }
      throw new Error(err);
    }
    const remoteDataHost = await RemoteHost.findOne({
      where: {
        [Op.and]: [
          { user_id: user_identification },
          { id_host: hostid }
        ]
      }
    });
    if (remoteDataHost == '' || null){
      res.status(404).send('Host not found')
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
    console.log(err);
    res.status(500).send(err);
  }
}
module.exports = connectDockerHost;