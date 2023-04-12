const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required to access' });
    }

    try {
        const decoded = jwt.verify(token, "b3JkaXMuY2xvdWQtMTE1OTc2MzQtMTgtMDMtMjAyMy1hYnlzMjcyLTA0MTAyMDAyLWphY2t5");
        req.data = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
