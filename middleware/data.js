const requestIp = require('request-ip');

const ipMiddleware = async (req, res, next) => {

    try{
        const clientIp = requestIp.getClientIp(req); 
        next();
    } catch (err) {
        console.warn(`Generic: ${err}`);
        res.status(500).send('Internal Server Error');
    };
};


module.exports = { ipMiddleware }