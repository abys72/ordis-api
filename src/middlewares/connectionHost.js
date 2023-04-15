const dockerHostCache = require('../caches/dockerHostCache');
const hostAvailable = (req, res, next) => {
    const userId = req.data.userId;
    const dockerConnection = dockerHostCache.getCachedDockerConnection(userId);
    console.log(dockerConnection);

    if(dockerConnection == 'undefined' || dockerConnection == null || dockerConnection == '') {
      res.status(400).send({
          message: "Require establish conection to host"
        })
    }
    req.dockerConn = dockerConnection;
    next();
}



module.exports = hostAvailable