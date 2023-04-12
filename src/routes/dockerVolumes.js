const router = require('express').Router();
const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const volumeController = require('../controllers/volumeController');
const validateHostConn = require('../middlewares/connectionHost');

router.get('/list',requiredToken, verifyToken, validateHostConn, volumeController.listVolume);
router.post('/create',requiredToken, verifyToken, validateHostConn, volumeController.createVolume);
router.delete('/remove',requiredToken, verifyToken, validateHostConn,volumeController.removeVolume);
module.exports = router;