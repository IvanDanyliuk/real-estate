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
  .any()
  // .optional()
  // .refine(
  //   (file) => !file || (file.size && file.size <= MAX_IMAGE_FILE_SIZE), 
  //   'Image size is outside the limit!'
  // )
  // .refine(
  //   (file) => !file || (file.type && ACCEPTED_IMAGE_TYPES.includes(file.type)), 
  //   'Unaccepted image type'
  // ),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterDataType = zod.infer<typeof registerSchema>;