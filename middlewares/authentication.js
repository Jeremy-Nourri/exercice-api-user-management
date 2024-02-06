const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Token non fourni');
    }

    try {
        const decoded = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        req.id = decoded.id;
        next();
    } catch (err) {
        res.status(401).send('Token invalide');
    }
}

module.exports = verifyToken;
