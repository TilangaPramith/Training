const requestIp = require('request-ip');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');
const { selectUserById } = require('../services/data');

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

// eslint-disable-next-line consistent-return
const isValidToken = async (req, res, next) => {
  const { token } = req;
  console.log(token);
  if (!token) return res.status(401).send('Unauthorized');

  try {
    // eslint-disable-next-line consistent-return
    jwt.verify(token, jwtSecret, async (err, payload) => {
      if (err || !payload) return res.status(401).send('Unauthorized');

      try {
        const user = await selectUserById(payload.id);
        console.log('ooooo', user);

        req.user = {
          user_id: user.id,
          email_address: user.email_address,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          mobile: user.mobile,
          company: user.company,
        };

        next();
      // eslint-disable-next-line no-shadow
      } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (err) {
    console.warn(`Generic: ${err}`);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { ipMiddleware, isValidToken };
