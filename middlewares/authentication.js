const jwt = require("jsonwebtoken");

function checkTokenValidity(req, res, next) {

  const token = req.headers.token
  jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, (err, user) => {
    if (err) {
        return res.status(401).json("Token is not valid");
    } else {
        req.user = user.id;
        next();
    }
})
}

module.exports = checkTokenValidity;
