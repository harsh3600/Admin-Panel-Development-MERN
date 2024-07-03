// routes/userRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser, createUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// protect, admin, 

router.route('/')
   .post( getAllUsers);

router.route('/create')
   .post( createUser);
   
router.route('/update/:id')
  .post(updateUser)

router.route('/delete/:id')
  .post( deleteUser)


module.exports = router;
