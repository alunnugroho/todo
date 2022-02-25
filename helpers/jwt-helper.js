const jwt = require('jsonwebtoken');

function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

function verify(payload) {
  return jwt.verify(payload, process.env.JWT_SECRET);
}

module.exports = {
  sign,
  verify
};
