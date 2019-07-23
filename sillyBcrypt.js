const md5 = require('md5');

const sillyBcrypt = {
  hash(rawPassword, iterations) {
    const randomSalt = Date.now();
    let hashedPassword;
    hashedPassword = md5(`${randomSalt}${rawPassword}`);
    for (let i = 0; i < 2 ** iterations; i += 1) {
      hashedPassword = md5(hashedPassword);
    }
    return `${randomSalt}$${iterations}$${hashedPassword}`;
  },

  compare(rawPassword, sillyBcryptHash) {
    const sillyBcryptHashArray = sillyBcryptHash.split('$');
    const salt = sillyBcryptHashArray[0];
    const iterations = sillyBcryptHashArray[1];
    let hashedPassword = md5(`${salt}${rawPassword}`);
    for (let i = 0; i < 2 ** iterations; i += 1) {
      hashedPassword = md5(hashedPassword);
    }
    hashedPassword = `${salt}$${iterations}$${hashedPassword}`;
    return sillyBcryptHash === hashedPassword;
  },
};

module.exports = sillyBcrypt;
