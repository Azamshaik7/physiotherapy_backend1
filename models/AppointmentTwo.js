const Appointment = require('../models/appointment'); // Ensure the correct path
const jwt = require('jsonwebtoken');

const bookAppointment = async (req, res) => {
  try {
    // Validate request body
    const { firstName, lastName, phoneNumber, date, service } = req.body;

    if (!firstName || !lastName || !phoneNumber || !date || !service) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found.' });
    }

    // Create new appointment
    const appointment = new Appointment({
      userId: req.user.userId,
      firstName,
      lastName,
      phoneNumber,
      date,
      service,
    });

    // Save appointment to the database
    await appointment.save();

    return res.status(201).json({ message: 'Appointment successfully booked!', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error.message);
    res.status(500).json({ message: 'Failed to book appointment. Please try again.' });
  }
};

module.exports = { bookAppointment };
