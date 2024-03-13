// fileHelper.js
const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

// Middleware function to handle file uploads
const uploadFile = (req, res, next) => {
  const uploadMiddleware = upload.single('image'); // 'image' should be the name attribute in your HTML form

  uploadMiddleware(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ error: 'Internal server error' });
    }

    // File uploaded successfully
    next();
  });
};

module.exports = { uploadFile };
