import { sign } from 'jsonwebtoken';

export const signToken = (userId: number) =>
  new Promise((resolve, reject) => {
    sign(
      { userId },
      process.env.APP_SECRET_KEY || 's',
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
