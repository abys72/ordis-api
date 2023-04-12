const dockerHostCache = require('../caches/dockerHostCache');
const hostAvailable = (req, res, next) => {
    const userId = req.data.userId;
    const dockerConnection = dockerHostCache.getCachedDockerConnection(userId);
    if(dockerConnection == 'undefined' || dockerConnection == null) {
      res.status(400).send({
          message: "For list networks you need first connect to one host"
        })
    }
    req.dockerConn = dockerConnection;
    next();
}



module.exports = hostAvailable