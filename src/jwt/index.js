const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({
      status: false,
      message: "No token provided",
    });
  jwt.verify(token, process.env.KEY, function (err, decoded) {
    if (err)
      return res.status(500).send({
        status: false,
        message: "Session Login Telah Habis, Silahkan Login Kembali",
      });
    next();
  });
}

function CheckToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({
      status: false,
      message: "No token provided",
    });
  jwt.verify(token, process.env.KEY, function (err, decoded) {
    if (err)
      return res.status(500).send({
        status: false,
        message: "Session Login Telah Habis, Silahkan Login Kembali",
      });
    next();
  });
}
const JwtSign = async (data) => {
  const token = jwt.sign(
    {
      guid: data.guid,
      email: data.email,
      role: data.role,
      phone_number: data.phone_number,
      name: data.name,
    },
    process.env.KEY,
    {
      expiresIn: "168h",
    }
  );
  return token;
};
const JwtSignPo = async (data) => {
  const token = jwt.sign(
    {
      po_code: data.po_code,
      po_guid: data.po_guid,
      po_name: data.po_name,
    },
    process.env.KEY,
    {
      expiresIn: "168h",
    }
  );
  return token;
};

function RefreshTokens(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({
      status: false,
      message: "No token provided",
    });
  jwt.verify(token, process.env.KEY, function (err, decoded) {
    if (err) {
    } else {
      return res.status(200).send({
        status: true,
        message: "succes ",
        token: token,
      });
    }
  });
}

const verifyRequest = async (req, res, next) => {
  const token = req.headers["access-token"];
  try {
    if (!token) {
      return res
        .status(403)
        .send({ status: false, message: "No token provided" });
    } else {
      if (token == process.env.TOKEN_STATIC) {
        next();
      } else {
        return res
          .status(500)
          .send({ status: false, message: "Failed to authenticate token." });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "An error occurred on the server !" });
  }
};

module.exports = {
  verifyToken,
  JwtSign,
  JwtSignPo,
  CheckToken,
  RefreshTokens,
  verifyRequest
};
