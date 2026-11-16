import { OAuth2Client, TokenPayload } from "google-auth-library";
import { AppError } from "../../pkg/error/error";
import { env } from "../config/env.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(
  idToken: string,
): Promise<TokenPayload | undefined> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: env.google.googleWebClientId,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw new AppError("Invalid Google token", 403);
  }
}
