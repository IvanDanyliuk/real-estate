import { z as zod } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from '../../../../../constants/main';

export const userSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  phone: zod.string(),
  location: zod.string(),
  profilePhoto: zod.union([
    zod
    .custom<FileList>((fileList) => fileList instanceof FileList, {
      message: "Property photos are required!",
    })
    .refine((fileList) => fileList[0].size <= MAX_IMAGE_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((fileList) => ACCEPTED_IMAGE_TYPES.includes(fileList[0].type), {
      message: "Invalid file format. Only PNG, JPEG, and SVG are allowed.",
    }),
    zod.array(
      zod
        .string()
        .url()
        .min(1, { message: 'At least one image URL is required!' })
    )
    .optional(),
  ]),
})
export type UserDataType = zod.infer<typeof userSchema>;