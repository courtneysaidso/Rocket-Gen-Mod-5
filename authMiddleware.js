const jwt = require('jsonwebtoken');

//verify the authentication token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if no token, return 401 Unauthorized

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if token is invalid, return 403 Forbidden
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;