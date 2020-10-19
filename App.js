const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bearerToken = require('express-bearer-token');
const requestIp = require('request-ip');
// eslint-disable-next-line no-unused-vars
const url = require('url');

const app = express();
const port = process.env.PORT || 3000;

require('./config/database');

const dataRouter = require('./routes/data');

app.use(logger('dev'));
app.use(cors());
app.use(bearerToken());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIp.mw());

app.use('/data', dataRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listening: http://localhost:${port}`));
module.exports = app;
