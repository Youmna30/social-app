import { Provider, Gender } from "../enum/enum";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  provider?: Provider;
  gender?: Gender;
  isPrivate?: boolean;
  isVerified?: boolean;
}
