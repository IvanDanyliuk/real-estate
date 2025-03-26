import { z as zod } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from '../../constants/main';

export const registerSchema = zod.object({
  name: zod.string().min(1).max(255),
  email: zod.string().email().min(1).max(255),
  phone: zod.string().min(12).max(20),
  password: zod.string().min(6).max(255),
  confirmPassword: zod.string().min(6).max(255),
  location: zod.string().min(1).max(255).optional(),
  profilePhoto: zod
    .custom<FileList>((fileList) => fileList instanceof FileList, {
      message: "File is required",
    })
    .refine((fileList) => fileList[0].size <= MAX_IMAGE_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((fileList) => ACCEPTED_IMAGE_TYPES.includes(fileList[0].type), {
      message: "Invalid file format. Only PNG, JPEG, and SVG are allowed.",
    })
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = zod.object({
  email: zod.string().email().min(1).max(255),
  password: zod.string().min(6).max(255),
});

export type RegisterDataType = zod.infer<typeof registerSchema>;
export type LoginDataType = zod.infer<typeof loginSchema>;