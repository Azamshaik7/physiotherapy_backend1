const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Verify token with your secret
    req.user = decoded; // Attach user info to request
    next(); // Pass to the next handler (bookAppointment)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
