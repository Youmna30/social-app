import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../../lib/config/env.js";
import { invalidRefreshToken } from "../errors.js";
import { IUser } from "../../user/interface/user.interface.js";

export function generateAccessToken(payload: JwtPayload & Partial<IUser>) {
  return jwt.sign(payload, env.jwt.secretAccessKey, { expiresIn: "1h" });
}
export function generateRefreshToken(payload: JwtPayload & Partial<IUser>) {
  return jwt.sign(payload, env.jwt.secretRefreshKey, { expiresIn: "7d" });
}
export async function decodeToken(token: string) {
  try {
    const user = jwt.verify(token, env.jwt.secretRefreshKey) as JwtPayload &
      Partial<IUser>;
    return user;
  } catch (error) {
    throw invalidRefreshToken;
  }
}
