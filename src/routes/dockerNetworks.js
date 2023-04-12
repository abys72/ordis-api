const router = require('express').Router();

const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const networkController = require('../controllers/networkController');
const validateHostConn = require('../middlewares/connectionHost')
router.post('/create', requiredToken, verifyToken,validateHostConn, networkController.createNetwork);
router.get('/list', requiredToken, verifyToken,validateHostConn, networkController.listNetwork);
router.delete('/remove', requiredToken, verifyToken,validateHostConn, networkController.removeNetwork);
router.post('/connect', requiredToken, verifyToken, verifyToken, networkController.connectNetwork);
router.post('/disconnect', requiredToken, verifyToken, verifyToken, networkController.disconnectNetwork);

module.exports = router;