const router = require('express').Router();
const { login, singup } = require('../controllers/userController');

router.post('/login', login);
router.post('/signup', singup)
module.exports = router;

