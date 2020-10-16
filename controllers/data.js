const UserAgent = require('user-agents');

const viewData = async (req, res) => {
    const { name, age, address, mobile } = "";
    if(req.body){
         this.name = req.body.name;
         this.age = req.body.age;
         this.address = req.body.address;
         this.mobile = req.body.mobile;
    }
    if(req.query){
        this.name = req.query.name;
        this.age = req.query.age;
        this.address = req.query.address;
        this.mobile = req.query.mobile;
    }
    try{
        const ip = req.clientIp;

        const userAgent = new UserAgent(); 
        console.log(userAgent.toString());
    
        const agent = userAgent.toString()
    
        console.log(this.name, " ", this.age, " ", this.address, " ", this.mobile);
        console.log(ip);
    
        const data = ip;
        res.json({data, agent});
    } catch(err){
        console.warn(`Generic: ${err}`);
        res.status(500).send();
    }
}

module.exports = { viewData }