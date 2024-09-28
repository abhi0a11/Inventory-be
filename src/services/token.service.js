import { Sign, Verify } from "../utils/token.util.js";

export const generateToken = async (payload, expiresIN, secret) => {
  let token = await Sign(payload, expiresIN, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  const check = await Verify(token, secret);
  return check;
};
