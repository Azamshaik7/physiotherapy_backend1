const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Path to the middleware file
const { signup, login, bookAppointment, getAppointments, bookAppointmentTwo } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/bookAppointment', authenticate, bookAppointment);
router.post('/bookAppointmentTwo', authenticate, bookAppointmentTwo); // Protect route// Protect route
router.get('/getAppointments', authenticate, getAppointments); // Protect route

module.exports = router;
