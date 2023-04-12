const dockerConnectionsCache = {};

function getCachedDockerConnection(userId) {
  return dockerConnectionsCache[userId];
}

function cacheDockerConnection(userId, connection) {
  dockerConnectionsCache[userId] = connection;
}

module.exports = {
  getCachedDockerConnection,
  cacheDockerConnection,
};
