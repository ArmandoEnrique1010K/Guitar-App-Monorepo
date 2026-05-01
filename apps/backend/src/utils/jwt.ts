import jwt from "jsonwebtoken";
import Types from "mongoose";

type UserPayload = {
  id: string;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "180d",
  });
  return token;
};
