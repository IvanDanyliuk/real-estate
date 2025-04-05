import { uploadToCloudinary } from "./cloudinary.service";
import PropertyModel from "../models/property.model";
import { removeFalseyFields } from "../utils/removeFlaseyFields";

export type GetPropertiesParams = {
  page: number,
  itemsPerPage: number,
  filters?: any,
  sortParams?: any,
  userId?: string,
};

export const getProperties = async ({
  page, itemsPerPage, filters, sortParams, userId
}: GetPropertiesParams) => {
  const query = removeFalseyFields({
    author: userId,
    ...filters,
  });

  const properties = await PropertyModel
    .find(query)
    .populate('author', '_id name email profilePhoto')
    .sort(sortParams)
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec();
  
  const count = await PropertyModel.countDocuments(query);

  return { 
    properties, 
    count, 
  };
};

export type CreatePropertyParams = {
  title: string;
  price: number;
  location: {
    city: string;
    address: string;
    marCoords?: {
      lat: number;
      lng: number;
    };
  };
  author: string;
  adType: string;
  description: string;
  images?: any;
  overview: {
    roomsNumber: number;
    propertyType: string;
    yearBuilt: number;
    floor?: number;
    numberOfFloors: number;
    area: number;
    withRenovation: string;
  };
  nearbyAmenities: {
    object: string;
    distanceTo: number;
  }[];
};

export const createProperty = async (data: CreatePropertyParams) => {
  const uploadedImagePaths = data.images && data.images.length > 0 
    ? await Promise.all(data.images.map((item: any) => uploadToCloudinary(item.buffer))) 
    : [];

  const newProperty = await PropertyModel.create({
    ...data,
    images: uploadedImagePaths
  });

  return newProperty;
};