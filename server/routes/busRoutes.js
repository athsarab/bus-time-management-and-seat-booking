const express = require('express');
const busController = require('../controllers/busController');
const multer = require('multer');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET all students
router.get('/bus', busController.getAllUsers);

// GET a specific user by ID
router.get('/bus/:id', busController.getUserById);

// POST a new user
router.post('/bus', upload.single('profile'), busController.createUser);

// PUT/UPDATE an existing user by ID
router.put('/bus/:id', upload.single('profile'), busController.updateUser);

// DELETE a user by ID
router.delete('/bus/:id', busController.deleteUser);

module.exports = router;
