const bcrypt = require('bcrypt');

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10);
    return hash;
}

const checkHash = async (passwordPlain, hashPassword) =>{
    return await bcrypt.compare(passwordPlain, hashPassword);
}


module.exports = { encrypt, checkHash};