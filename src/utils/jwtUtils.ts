import jwt from "jsonwebtoken";

export const generateToken = (payload: object): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
