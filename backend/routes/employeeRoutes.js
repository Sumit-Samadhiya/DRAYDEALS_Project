const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const multer = require('multer');

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only jpg/png are allowed!'), false);
    }
  }
});

// Employee routes
router.post('/add', upload.single('img'), employeeController.addEmployee);
router.get('/list', employeeController.getEmployees);
router.delete('/delete/:id', employeeController.deleteEmployee);
router.put('/edit/:id', employeeController.editEmployee);

module.exports = router;
