const jwt = require('jsonwebtoken');

function auth(req, res, next) {


    const token = req.cookies['my-token'];
    if (!token) return res.render('LoginPage');

    try {
        const decoded = jwt.verify(token, process.env.presto_jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).send('Invalid token');

    }


}

module.exports = auth;