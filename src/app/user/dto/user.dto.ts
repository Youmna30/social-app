import { z } from "zod";
import { Gender } from "../enum/enum";

export const updateUserDTO = z.object({
  username: z.string().min(2).max(20).trim().optional(),
  email: z.string().email().toLowerCase().trim().optional(),
  gender: z.enum(Gender).optional(),
});
