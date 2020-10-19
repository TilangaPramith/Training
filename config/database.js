const mongoose = require('mongoose');

const url = 'mongodb://localhost/immunifymeDB';

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection
  .once('open', () => {
    console.log('Connected!');
  })
  .on('error', (error) => {
    console.log('Make Error ', error);
  });
