import { z } from "zod";
import { Gender } from "../../user/enum/enum";

export const registerDTO = z.object({
  username: z.string("Username is required").min(2).max(20).trim(),
  email: z.email("Email is required").toLowerCase().trim(),
  password: z.string("Password is required").min(8).max(16).trim(),
  gender: z.enum(Gender).optional(),
});

export const loginDTO = z.object({
  email: z.email("Email is required").toLowerCase().trim(),
  password: z.string("Password is required").min(8).max(16).trim(),
});

export const verifyAccountDTO = z.object({
  email: z.email("Email is required").toLowerCase().trim(),
  code: z.string("Code is required").length(6).trim(),
});

export const sendOtpDTO = z.object({
  email: z.email("Email is required").toLowerCase().trim(),
});

export const resetPasswordDTO = z.object({
  email: z.email("Email is required").toLowerCase().trim(),
  code: z.string("Code is required").length(6).trim(),
  newPassword: z.string("New password is required").min(8).max(16).trim(),
});

export const verifyEnableTwoStepVerificationDto = z.object({
  code: z.string("Code is required").length(6).trim(),
});
export const loginConfirmationDto = z.object({
  email: z.email("Email is required").toLowerCase().trim(),
  code: z.string("Code is required").length(6).trim(),
});
