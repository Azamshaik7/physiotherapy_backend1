const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your model
const jwt = require('jsonwebtoken'); // Required for generating a JWT token
const Appointment = require('../models/Appointmnet'); // Import the Appointment model

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send response with the token
    return res.status(200).json({
      message: 'Login successful',
      token, // Send the token to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book appointment controller
const bookAppointment = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, date, service, doctors, category } = req.body;

    // Ensure that the userId is coming from the authenticated user
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    // Create a new appointment with the userId
    const appointment = new Appointment({
      userId: req.user.userId, // Link to the logged-in user's ID
      firstName,
      lastName,
      phoneNumber,
      date,
      service,
      doctors,
      category,
    });

    // Save the appointment
    await appointment.save();

    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to book appointment' });
  }
};

const bookAppointmentTwo = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, date, service } = req.body;

    // Ensure that the userId is coming from the authenticated user
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    // Create a new appointment with the userId
    const appointment = new bookAppointmenttwo({
      userId: req.user.userId, // Link to the logged-in user's ID
      firstName,
      lastName,
      phoneNumber,
      date,
      service
    });

    // Save the appointment
    await appointment.save();

    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to book appointment' });
  }
};




// Get all appointments for a user
const getAppointments = async (req, res) => {
  try {
    // Ensure the userId is coming from the authenticated user
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    // Fetch appointments for the logged-in user
    const appointments = await Appointment.find({ userId: req.user.userId });

    // Respond with the user's appointments
    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};



module.exports = { signup, login, bookAppointment, getAppointments ,bookAppointmentTwo };
