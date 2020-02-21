const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');

// Multer settings
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

const multerSettings = upload.fields([{ name: 'thumb', maxCount: 1 }, { name: 'images', maxCount: 8 }]);

require('dotenv').config();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));

/* Import routes */
const product = require('./routes/product');
const user = require('./routes/user');
const auth = require('./routes/auth');

/* Mount routes */
app.use('/api/v1/product', multerSettings, product);
app.use('/api/v1/user', multerSettings, user);
app.use('/api/v1/auth', multerSettings, auth);

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/soap', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected')
});

const port = 5050;
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
