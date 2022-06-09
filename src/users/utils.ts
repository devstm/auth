import { verify, sign } from 'jsonwebtoken';

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(token, process.env.SECRET_KEY, (err, match) => {
      if (err) return reject(err);
      return resolve(match);
    });
  });
export const signToken = (providerName, userId) =>
  new Promise((resolve, reject) => {
    sign({ providerName, providerID: userId }, 'saleh', (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });

module.exports = { verifyToken, signToken };
