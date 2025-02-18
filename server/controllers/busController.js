const User = require('../models/busModel');
const fs = require('fs');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new user
exports.createUser = async (req, res) => {
  try {
    const { name, detime, email, phone, parent } = req.body;
    let user = new User({
      name,
      detime,
      email,
      phone,
      profile: req.file ? req.file.filename : '',
      parent,
    });
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT/UPDATE an existing user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name;
    user.detime = req.body.detime;
    user.email = req.body.email;
    user.phone = req.body.phone;

    if (req.file) {
      // Delete previous profile picture if it exists
      if (user.profile) {
        fs.unlinkSync(`uploads/${user.profile}`);
      }
      user.profile = req.file.filename;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Delete all child documents
    let children = await User.find({ parent: req.params.id });
    children.forEach((child) => {
      if (child.profile) {
        fs.unlinkSync(`uploads/${child.profile}`);
      }
    });
    await User.deleteMany({ parent: req.params.id });

    // Delete the parent document
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the profile picture if it exists
    if (user.profile) {
      fs.unlinkSync(`uploads/${user.profile}`);
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
