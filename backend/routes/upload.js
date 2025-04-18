const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();

// AWS S3 Configuration - Hardcoded credentials (not recommended for production)
AWS.config.update({
  accessKeyId: 'AKIAQ4NSBN4OL7WV3AVW',        // 🔁 Replace with your actual AWS Access Key ID
  secretAccessKey: 'yRnjK0nvvy+NlLbCBNno+W+3NFaVMn81ykKMoIpm', // 🔁 Replace with your actual AWS Secret Access Key
  region: 'ap-south-1',                          // ✅ Use your actual region
});

const s3 = new AWS.S3();
const bucketName = 'numaish-assets'; // Replace with your actual bucket name

// Multer Storage Setup (Using multer-s3 for S3 storage)
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',  // This allows public read access to uploaded files
    key: function (req, file, cb) {
      // Generating a unique file name for each upload (using timestamp and original file name)
      const filename = `memories/${Date.now()}_${file.originalname}`;
      cb(null, filename);  // Set the file key in the S3 bucket
    },
  }),
});

// Route: POST /upload
router.post('/', upload.single('memory'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Successfully uploaded to S3, return the image URL
  res.json({
    message: 'Memory uploaded successfully!',
    imageUrl: req.file.location,  // This is the URL of the uploaded image in the S3 bucket
  });
});

module.exports = router;
