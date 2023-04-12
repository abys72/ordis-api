const axios = require('axios');

async function getContianerUser(containerId) {
    const response = await axios.get(`${process.env.DOCKER_API}/containers/json?filters={"id":["${containerId}"]}`);
    return response.data;
  }
  
  module.exports = {
    getUser,
  };