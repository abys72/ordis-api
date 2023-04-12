const router = require('express').Router();

const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const containerController = require('../controllers/containersController');
const validateHostConn = require('../middlewares/connectionHost')
router.get('/list', requiredToken, verifyToken,validateHostConn, containerController.listContainers);
router.post('/create', requiredToken, verifyToken, validateHostConn, containerController.createContainer);
router.delete('/remove', requiredToken, verifyToken, validateHostConn, containerController.removeContainer);
router.post('/kill', requiredToken, verifyToken, validateHostConn, containerController.killContainer);
router.post('/restart', requiredToken, verifyToken, validateHostConn, containerController.restartContainer);
router.post('/stop', requiredToken, verifyToken, validateHostConn, containerController.stopContainer);
router.post('/start', requiredToken, verifyToken, validateHostConn, containerController.startContainer);
router.post('/inspect', requiredToken, verifyToken, validateHostConn, containerController.inspectContainer);
router.post('/log', requiredToken, verifyToken, validateHostConn, containerController.logContainer);
router.post('/rename',requiredToken, verifyToken, validateHostConn, containerController.renameContainer);
module.exports = router;