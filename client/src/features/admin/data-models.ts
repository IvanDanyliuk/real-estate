import { z as zod } from 'zod';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_FILE_SIZE } from '../../constants/main';

export const propertySchema = zod.object({
  title: zod.string().min(1).min(255),
  price: zod.number().gte(0),
  location: zod.object({
    city: zod.string().min(1).max(255),
    address: zod.string().min(1).max(255),
    mapCoords: zod.object({
      lat: zod.number(),
      lng: zod.number(),
    }).optional(),
  }),
  adType: zod.string().min(1).max(255),
  author: zod.string().min(1),
  description: zod.string().min(1).max(1000),
  images: zod.any(),
    // .custom<FileList>((fileList) => fileList instanceof FileList, {
    //   message: "File is required",
    // })
    // .refine((fileList) => fileList[0].size <= MAX_IMAGE_FILE_SIZE, {
    //   message: "File size must be less than 5MB",
    // })
    // .refine((fileList) => ACCEPTED_IMAGE_TYPES.includes(fileList[0].type), {
    //   message: "Invalid file format. Only PNG, JPEG, and SVG are allowed.",
    // })
    // .optional(),
  overview: zod.object({
    roomsNumber: zod.number().lte(0),
    propertyType: zod.string().min(1).max(255),
    yearBuilt: zod.number().gt(0),
    floor: zod.number().gte(0).optional(),
    numberOfFloors: zod.number().gt(0),
    area: zod.number().gt(0),
    isRenovated: zod.boolean(),
  }),
  nearbyAmenities: zod.array(
    zod.object({
      object: zod.string().min(1).max(255),
      distanceTo: zod.number().gte(0),
    })
  ),
});

export type PropertyDataType = zod.infer<typeof propertySchema>;