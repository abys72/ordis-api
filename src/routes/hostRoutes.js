const router = require('express').Router();

const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const dockerHostController = require('../controllers/dockerHostController');
const remoteHostController = require('../controllers/remoteHostController');
router.post('/new', requiredToken, verifyToken, remoteHostController.createHost );
router.post('/connect', requiredToken, verifyToken, dockerHostController);
router.get('/list', requiredToken, verifyToken,remoteHostController.listHosts);
module.exports = router;
