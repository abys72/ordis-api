const router = require('express').Router();

const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const dockerHostController = require('../controllers/dockerHostController');
const createHostController = require('../controllers/remoteHostController');
router.post('/new', requiredToken, verifyToken, createHostController );
router.post('/connect', requiredToken, verifyToken, dockerHostController);

module.exports = router;
