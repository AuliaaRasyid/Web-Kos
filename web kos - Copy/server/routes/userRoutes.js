const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userController');
const {createPayment} = require('../controller/paymentController');
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
  deleteComplaint,
  getStatus,
  updateStatus
} = require('../controller/penghuniController');

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

router.route('/status')
  .get(getStatus)
  .put(updateStatus);

router.route('/users/:userId/create-payment')
 .post(createPayment);


router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;