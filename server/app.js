const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});
