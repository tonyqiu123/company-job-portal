const express = require('express');
const router = express.Router();
const { getUser, createUser, loginUser, updateUser, deleteUser, uploadFile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer to specify the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/'); // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Generate a unique filename
  }
});

// Create a multer instance with the configuration
const upload = multer({ storage: storage });

router.post('/login', loginUser);

router.post('/', createUser);

router.get('/', protect, getUser);

router.put('/', protect, updateUser);

router.post('/upload-file', protect, upload.single('file'), uploadFile);

router.delete('/', protect, deleteUser);

module.exports = router;
