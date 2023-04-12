const router = require('express').Router();

const requiredToken = require("../middlewares/authRequired")
const verifyToken = require('../middlewares/authVerification');
const imageController = require('../controllers/imagesController');
const validateHostConn = require('../middlewares/connectionHost')
router.get('/list', requiredToken, verifyToken,validateHostConn, imageController.listImages);
router.delete('/remove', requiredToken, verifyToken, validateHostConn, imageController.removeImage);
router.post('/inspect',requiredToken, verifyToken, validateHostConn, imageController.inspectImage);
router.post('/tag', requiredToken, verifyToken, validateHostConn, imageController.tagImage);
router.post('/pull', requiredToken, verifyToken, validateHostConn, imageController.pullImage);
module.exports = router;