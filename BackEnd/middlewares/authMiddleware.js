const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const checkAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Decode the token and attach the user data to the request objec 
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;  // Attach the decoded user info to the request object
    
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = checkAuth;
