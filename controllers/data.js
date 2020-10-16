
const viewData = async (req, res) => {
    const { name, age, address, mobile } = req.body;
    const ip = req.clientIp;

    console.log(name, " ", age, " ", address, " ", mobile);
    console.log(ip);

    const data = ip;
    res.json({data});
}

module.exports = { viewData }