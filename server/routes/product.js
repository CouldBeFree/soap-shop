const express = require('express');
const router = express.Router();
const multer = require('multer');
const { postProduct } = require('../controllers/product');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const multerSettings = upload.fields([{ name: 'thumb', maxCount: 1 }, { name: 'products', maxCount: 8 }]);

router.post('/', multerSettings, postProduct);

module.exports = router;
