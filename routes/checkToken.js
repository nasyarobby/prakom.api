const jwt = require("jsonwebtoken");
module.exports = function checkToken(req, res, next) {
  const token = req.header("Authorization");
  if (token) {
    const decodedToken = jwt.decode(token.split(" ")[1]);
    if (decodedToken) {
      req.user = decodedToken;
      next();
    } else {
      res.jsend.fail({ token: "token is invalid." });
    }
  } else res.jsend.fail({ token: "token is missing." });
};
