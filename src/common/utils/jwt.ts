import { sign, verify } from 'jsonwebtoken';

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

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(token, process.env.APP_SECRET_KEY, (err, match) => {
      if (err) return reject(err);
      return resolve(match);
    });
  });
