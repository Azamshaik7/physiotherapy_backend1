// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middleware/authenticate'); // Path to the middleware file
// const { signup, login, bookAppointment, getAppointments } = require('../controllers/authController');

// router.post('/signup', signup);
// router.post('/login', login);
// router.post('/bookAppointment', authenticate, bookAppointment); // Protect route
// router.get('/getAppointments', authenticate, getAppointments); // Protect route

// module.exports = router;


const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { signup, login, bookAppointment, getAppointments, getUserDetails } = require('../controllers/authController');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.post('/bookAppointment', authenticate, bookAppointment);
router.get('/getAppointments', authenticate, getAppointments);
router.get('/getUserDetails', authenticate, getUserDetails); // Add this route

module.exports = router;
