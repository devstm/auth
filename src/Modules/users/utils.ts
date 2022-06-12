import { verify, sign } from 'jsonwebtoken';

export const signToken = (providerName, userId) =>
  new Promise((resolve, reject) => {
    sign(
      { providerName, providerID: userId },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      },
      { expiresIn: '1h' },
    );
  });

module.exports = { signToken };
