const requestIp = require('request-ip');

const ipMiddleware = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const clientIp = requestIp.getClientIp(req);
    next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Generic: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { ipMiddleware };
