const UserAgent = require('user-agents');
const compareVersions = require('compare-versions');
// const bcrypt = require('bcrypt');
// await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

const { registrationUser, selectUserByEmail } = require('../services/data');

const registerUser = async (req, res) => {
  try {
    if (JSON.parse(JSON.stringify(req.query)) || JSON.parse(JSON.stringify(req.body))) {
      if (req.body) {
        console.log(req.body.first_name);
        this.first_name = req.body.first_name;
        this.last_name = req.body.last_name;
        this.address = req.body.address;
        this.mobile = req.body.mobile;
        this.email_address = req.body.email_address;
        this.company = req.body.company;
        this.password = req.body.password;
      } else if (req.query) {
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
        };
        // eslint-disable-next-line no-console
        console.log(this.first_name, ' ', this.last_name, ' ', this.address, ' ', this.mobile);
        // eslint-disable-next-line no-console
        console.log(ip, agent);

        await registrationUser(user);

        res.status(201).send('Success Registration');
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
    console.log(password);
    const users = await selectUserByEmail(email_address);
    console.log(users.password);
    if (!users) return res.status(404).send('E-mail address is not registered!');
    const match = compareVersions.compare(password, users.password, '=');
    if (!match) return res.status(401).send('Incorrect password!');

    res.status(201).send('Logging successfully');
  } catch (err) {
    console.warn(`Generic: ${err}`);
    res.status(500).send();
  }
};

module.exports = { registerUser, authenticateUser };
