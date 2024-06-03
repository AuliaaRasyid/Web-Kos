const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { registerUser, loginUser } = require('../controller/userController');
const {
  getAllUsers,
  getUserById,
  createUserAndRegister,
  updateUser,
  deleteUser,
  updateUserPassword,
  createKeluhan,
  getAllComplaints,
  getComplaintById,
  deleteComplaint
} = require('../controller/penghuniController');

// Endpoint to fetch all users with role 'user'
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route('/users')
  .get(getAllUsers)         // Fetch all users
  .post(createUserAndRegister); // Create and register a new user

router.route('/users/:id')
  .get(getUserById)         // Fetch a user by ID
  .put(updateUser)          // Update a user by ID
  .delete(deleteUser);      // Delete a user by ID

router.route('/users/:id/change-password') // password change
  .put(updateUserPassword);

router.route('/users/:id/keluhan') // keluhan
  .post(createKeluhan);

router.route('/complaints')
  .get(getAllComplaints);

router.route('/users/:userId/complaints/:complaintId')
  .get(getComplaintById)
  .delete(deleteComplaint);


router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;