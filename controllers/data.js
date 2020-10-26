const UserAgent = require('user-agents');
const compareVersions = require('compare-versions');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

// const bcrypt = require('bcrypt');
// await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

const { registrationUser, selectUserByEmail } = require('../services/data');

const registerUser = async (req, res) => {
  console.log(req.body.first_name);
  try {
    if (JSON.parse(JSON.stringify(req.query)) || JSON.parse(JSON.stringify(req.body))) {
      if (req.body) {
        console.log('opoopo');
        console.log(req.body);
        this.first_name = req.body.first_name;
        this.last_name = req.body.last_name;
        this.address = req.body.address;
        this.mobile = req.body.mobile;
        this.email_address = req.body.email_address;
        this.company = req.body.company;
        this.password = req.body.password;
      } else if (req.query.email_address) {
        console.log(';;;;;');
        this.first_name = req.query.first_name;
        this.last_name = req.query.last_name;
        this.address = req.query.address;
        this.mobile = req.query.mobile;
        this.email_address = req.query.email_address;
        this.company = req.query.company;
        this.password = req.query.password;
      }
      try {
        const ip = req.clientIp;

        const userAgent = new UserAgent();
        // eslint-disable-next-line no-console
        console.log(userAgent.toString());

        const agent = userAgent.toString();

        const user = {
          first_name: this.first_name,
          last_name: this.last_name,
          email_address: this.email_address,
          mobile: this.mobile,
          company: this.company,
          password: this.password,
          address: this.address,
        };
        // eslint-disable-next-line no-console
        console.log(this.first_name, ' ', this.last_name, ' ', this.address, ' ', this.mobile);
        // eslint-disable-next-line no-console
        console.log(ip, agent);

        const users = await registrationUser(user);
        const data = users.ops;
        // eslint-disable-next-line no-underscore-dangle
        console.log(data[0]._id);

        res.status(201).send({
          email: data[0].email_address,
          message: 'email of user that just signed up',
          // eslint-disable-next-line no-underscore-dangle
          id: data[0]._id,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Generic: ${err}`);
        res.status(500).send();
      }
    } else {
      res.status(400).send({ message: 'SyntaxError: Unexpected token in JSON body' });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Generic: ${err}`);
    res.status(400).send({ message: 'SyntaxError: Unexpected token in JSON body' });
  }
};

// eslint-disable-next-line consistent-return
const authenticateUser = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { password, email_address } = req.body;

  try {
    console.log(password, email_address);
    const users = await selectUserByEmail(email_address);
    // eslint-disable-next-line no-underscore-dangle
    console.log(users);
    if (!users) return res.status(404).send('E-mail address is not registered!');
    console.log('mai');
    const match = compareVersions.compare(password, users.password, '=');
    console.log('mai22');
    if (!match) return res.status(401).send('Incorrect password!');

    const token = jwt.sign({ user_id: users.id }, jwtSecret, { expiresIn: 259200 });

    res.status(201).json({
      token,
      user: {
        user_id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        mobile: users.mobile,
        company: users.company,
        address: users.address,
        email_address: users.email_address,
      },
    });
  } catch (err) {
    console.warn(`Generic: ${err}`);
    res.status(500).send();
  }
};

const getUser = async (req, res) => {
  console.log(req.user);
  const users = [];
  users.push(req.user);
  res.json(users);
};

module.exports = { registerUser, authenticateUser, getUser };
