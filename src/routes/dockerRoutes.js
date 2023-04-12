const router = require('express').Router();
const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const validateHostConn = require('../middlewares/connectionHost');
const dockerNetwork = require('./dockerNetworks');
const dockerVolume = require('./dockerVolumes');
const dockerImage = require('./dockerImages');
const dockerContainer = require('./dockerContainer');

router.use('/network', requiredToken, verifyToken, validateHostConn, dockerNetwork);
router.use('/volume', requiredToken, verifyToken,validateHostConn, dockerVolume);
router.use('/image',requiredToken, verifyToken,validateHostConn, dockerImage);
router.use('/container', requiredToken, verifyToken, validateHostConn, dockerContainer);
module.exports = router;