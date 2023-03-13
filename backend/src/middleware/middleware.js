const jwt = require('jsonwebtoken');

const acessValidator = (req, res, next) => {
    let token = req.headers.authorization;

    if(token) {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.KEY, (err, data) => {
            if(err != null) res.status(404).json(err).end();
            else {
                // console.log(data)
                if(data.management === true) {
                    next();
                }else {
                    res.status(401).end();
                }
            }
        });
    }else {
        res.status(401).end();
    }
}

module.exports = {
    acessValidator
}