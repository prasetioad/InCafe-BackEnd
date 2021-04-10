const jwt = require("jsonwebtoken");
const formatResult = require("../helpers/formatResult");
require("dotenv").config(); // Import env Config

const Auth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (!err) {
        if (decoded.role) req.body.role = decoded.role;
        next();
      } else {
        if (err.message === "jwt malformed") {
          formatResult(res, 400, false, "Invalid Token", null);
        } else if (err.message === "jwt expired") {
          formatResult(res, 400, false, "Token Expired", null);
        } else {
          formatResult(req, 400, false, "Invalid Signature", null);
        }
      }
    });
  } else {
    formatResult(res, 400, false, "Unauthorized", "Token Needed");
  }
};

const AuthAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (!err) {
        if (decoded.role === "admin") {
          next();
        } else {
          formatResult(res, 400, false, "Admin Only", null);
          console.log('adminonly');
        }
      } else {
        if (err.message === "jwt malformed") {
          formatResult(res, 400, false, "Invalid Token", null);
        } else if (err.message === "jwt expired") {
          formatResult(res, 400, false, "Token Expired", null);
        } else {
          formatResult(res, 400, false, "Invalid Signature", null);
        }
      }
    });
  } else {
    formatResult(res, 400, false, "Unauthorized", "Token Needed");
  }
};

const AuthRefresh = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_REFRESH, function (err, decoded) {
      if (!err) {
        if (decoded.role) req.body.role = decoded.role;
        next();
      } else {
        if (err.message === "jwt malformed") {
          formatResult(res, 400, false, "Invalid Token", null);
        } else if (err.message === "jwt expired") {
          formatResult(res, 400, false, "Token Expired", null);
        } else {
          formatResult(req, 400, false, "Invalid Signature", null);
        }
      }
    });
  } else {
    formatResult(res, 400, false, "Unauthorized", "Token Needed");
  }
};

const AuthVerif = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_VERIF, function (err, decoded) {
      if (!err) {
        if (decoded.role) req.body.role = decoded.role;
        next();
      } else {
        if (err.message === "jwt malformed") {
          formatResult(res, 400, false, "Invalid Token", null);
        } else if (err.message === "jwt expired") {
          formatResult(res, 400, false, "Token Expired", null);
        } else {
          formatResult(req, 400, false, "Invalid Signature", null);
        }
      }
    });
  } else {
    formatResult(res, 400, false, "Unauthorized", "Token Needed");
  }
};

module.exports = { Auth, AuthAdmin, AuthRefresh, AuthVerif };
