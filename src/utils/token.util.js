import jwt from "jsonwebtoken";

export const Sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: expiresIn,
      },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
};

export const Verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) reject(error);
      else resolve(payload);
    });
  });
};
