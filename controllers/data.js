const UserAgent = require('user-agents');

const viewData = async (req, res) => {
    
    const { name, age, address, mobile } = req.body;

    try{
        const ip = req.clientIp;

        const userAgent = new UserAgent(); 
        console.log(userAgent.toString());
    
        const agent = userAgent.toString()
    
        console.log(name, " ", age, " ", address, " ", mobile);
        console.log(ip);
    
        const data = ip;
        res.json({data, agent});
    } catch(err){
        console.warn(`Generic: ${err}`);
        res.status(500).send();
    }

   
}

module.exports = { viewData }