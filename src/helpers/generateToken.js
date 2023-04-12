const jwt = require('jsonwebtoken');
const ordisToken = "b3JkaXMuY2xvdWQtMTE1OTc2MzQtMTgtMDMtMjAyMy1hYnlzMjcyLTA0MTAyMDAyLWphY2t5";

function generateToken(data) {
  return jwt.sign(
    { userId: data.userId, email : data.email },
    ordisToken,
    { expiresIn: "2h" }
  );
}

module.exports = generateToken;
