// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// controllers/authController.js
const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
 
});



exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    console.log(req.body)
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    // let user = await User.findOne({ email });
    // if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ firstName, lastName, email, password });
    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({role:"User", token:token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("working")
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100h' });

    res.status(200).json({role:user.role, token:token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.logout = async (req, res) => {
  
  try {
    console.log("working")
        res.status(200).json({ status:200,
      message:"Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


