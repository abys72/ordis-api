const requiredToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined' || !bearerHeader){
        const baerer = bearerHeader.split(' ')[1];
        req.token = baerer;
        next(); 
    }
    
    
  } catch (error) {
    res.status(401).json({ message: 'Authorization required' });
  }
};

module.exports = requiredToken;
