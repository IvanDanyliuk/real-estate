import { z as zod } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from '../../../../../constants/main';

export const propertySchema = zod.object({
  title: zod.string().min(1).max(255),
  price: zod.number().gte(0),
  location: zod.object({
    region: zod.string().min(1),
    city: zod.string().min(1).max(255),
    address: zod.string().min(1).max(255),
    mapCoords: zod.object({
      lat: zod.number(),
      lng: zod.number(),
    }).optional(),
  }),
  type: zod.string().min(1).max(255),
  market: zod.enum(['primary', 'secondary']),
  description: zod.string().min(1).max(1000),
  images: zod.union([
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
    ),
  ]),
  overview: zod.object({
    roomsNumber: zod.number().gte(0),
    propertyType: zod.string().min(1).max(255),
    yearBuilt: zod.number().gt(0),
    floor: zod.number().gte(0).optional(),
    numberOfFloors: zod.number().gt(0),
    area: zod.number().gt(0),
    withRenovation: zod.string(),
  }),
  nearbyAmenities: zod.array(
    zod.object({
      object: zod.string().min(1).max(255),
      distanceTo: zod.number().gte(0),
    })
  ),
});

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
    ),
  ]),
})

export type PropertyDataType = zod.infer<typeof propertySchema>;
export type UserDataType = zod.infer<typeof userSchema>;