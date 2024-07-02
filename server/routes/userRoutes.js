// routes/userRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, admin, getAllUsers)
  .post(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
