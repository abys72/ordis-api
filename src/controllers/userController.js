const OrdisUser = require('../databases/models/user');
const generateToken = require('../helpers/generateToken');
const { encrypt, checkHash } = require('../helpers/handlerBycrypt');
async function login(req, res) {
  try {
    const { email, password} = req.body;
    if (!email || !password || email.trim() === '' || password.trim() === '' ){
      const err = {
        error : "Invalid Parameters",
        usage : {
          email : "example@example.com",
          password : "password"
        }
      }
      res.status(400).send(err)
      return;
    }
    const userId = await OrdisUser.findOne({where: {email: email}});
    if (!userId) {
      res.status(404).send({error: "User not found"});
      return;
    }
    const checkPassword = await checkHash(password, userId.credential);
    const tokenSession = generateToken({
      email, 
      userId: userId.user_id
    });
    if (checkPassword) {
      res.status(200).json({
        details: userId,
        token: tokenSession
      });
      return;
    } else {
      res.status(400).send("Error, check Username or Credential");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function singup(req, res) {
  const { email, name, password } = req.body;

  if (!email || email.trim() === '' || !name || name.trim() === ''|| !password || password.trim() === '') {
    res.status(400).json({
       error: 'Debe proporcionar email, name y password',
       format: {
        email: "example@example.com",
        name: "Example",
        password: "password"
       } 
      });
      return;
  }
  const user = await OrdisUser.findOne({where: {email: email}});
  if (user) {
    res.status(409).send({
      error: "Email registered"
    })
    return;
  }
  try {
    const passwordHash = await encrypt(password);
    const registerUser = await OrdisUser.create({
      email: email,
      user_name: name,
      credential: passwordHash
    });
    res.status(200).send({ data: registerUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}


module.exports = { login, singup };