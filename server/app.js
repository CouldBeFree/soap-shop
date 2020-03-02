const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multerSettings = require('./utils/multer');
const passport = require('passport');

require('dotenv').config();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));

// Passport Config
//require('./config/passport')(passport);

// Multer middleware
app.all('*', multerSettings);

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

/* Import routes */
const product = require('./routes/product');
const user = require('./routes/user');
const auth = require('./routes/auth');

/* Mount routes */
app.use('/api/v1/product', product);
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

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
