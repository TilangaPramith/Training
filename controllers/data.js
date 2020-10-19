const UserAgent = require('user-agents');

const viewData = async (req, res) => {
  try {
    if (JSON.parse(JSON.stringify(req.query)) || JSON.parse(JSON.stringify(req.body))) {
      if (req.body) {
        this.name = req.body.name;
        this.age = req.body.age;
        this.address = req.body.address;
        this.mobile = req.body.mobile;
      }
      if (req.query) {
        this.name = req.query.name;
        this.age = req.query.age;
        this.address = req.query.address;
        this.mobile = req.query.mobile;
      }
      try {
        const ip = req.clientIp;

        const userAgent = new UserAgent();
        // eslint-disable-next-line no-console
        console.log(userAgent.toString());

        const agent = userAgent.toString();

        // eslint-disable-next-line no-console
        console.log(this.name, ' ', this.age, ' ', this.address, ' ', this.mobile);
        // eslint-disable-next-line no-console
        console.log(ip);

        const arr = [{ ip }, { agent }];
        res.json(arr);
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

module.exports = { viewData };
