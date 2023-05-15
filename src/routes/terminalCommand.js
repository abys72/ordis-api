const router = require('express').Router();
const terminalController = require('../controllers/terminalController');
const requiredToken = require("../middlewares/authRequired");
const verifyToken = require('../middlewares/authVerification');

router.post('/terminal', requiredToken, verifyToken, terminalController.executeShell)

module.exports = router;