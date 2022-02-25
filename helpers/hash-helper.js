const bcrypt = require('bcryptjs');

function hash(input) {
  return bcrypt.hashSync(input, 10);
}

function compare(input, hashedInput) {
  return bcrypt.compareSync(input, hashedInput);
}

module.exports = {
  hash,
  compare
};
