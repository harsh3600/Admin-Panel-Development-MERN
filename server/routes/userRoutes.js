// routes/userRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, admin, getAllUsers)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
