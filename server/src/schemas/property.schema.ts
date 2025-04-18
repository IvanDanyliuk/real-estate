import { z as zod } from "zod";

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
  author: zod.string().min(1),
  description: zod.string().min(1).max(1000),
  images: zod.any().optional(),
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