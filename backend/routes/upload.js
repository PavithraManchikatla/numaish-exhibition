const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();

// AWS S3 Configuration
AWS.config.update({
  accessKeyId: 'AKIAQ4NSBN4OL7WV3AVW',        // 🔁 Replace with your actual key
  secretAccessKey: 'yRnjK0nvvy+NlLbCBNno+W+3NFaVMn81ykKMoIpm', // 🔁 Replace with your actual secret
  region: 'ap-south-1',                          // ✅ Use your correct region
});

const s3 = new AWS.S3();
const bucketName = 'numaish-assets'; // 🔁 Replace with your actual bucket name

// Multer Storage Setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    key: function (req, file, cb) {
      const filename = `memories/${Date.now()}_${file.originalname}`;
      cb(null, filename);
    },
  }),
});

// Route: POST /upload
router.post('/', upload.single('memory'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'Memory uploaded successfully!',
    imageUrl: req.file.location,
  });
});

module.exports = router;
