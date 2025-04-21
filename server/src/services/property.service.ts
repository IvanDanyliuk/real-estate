import { deleteFromCloudinary, uploadToCloudinary } from "./cloudinary.service";
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
    .populate("author", "_id name email profilePhoto")
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

export interface CreatePropertyParams {
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
  type: string;
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

  return newProperty.populate('author');
};

export interface UpdatePropertyParams extends CreatePropertyParams {
  _id: string;
};

export const updateProperty = async (propertyToUpdate: UpdatePropertyParams) => {
  const existingProperty = await PropertyModel.findById(propertyToUpdate._id);

  const uploadedImages = propertyToUpdate.images && propertyToUpdate.images.length > 0  
  ? await Promise.all(propertyToUpdate.images.map((item: any) => uploadToCloudinary(item.buffer))) 
  : null;

  const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyToUpdate._id, {
    ...propertyToUpdate,
    images: uploadedImages || existingProperty!.images,
  }, { new: true });

  return updatedProperty;
};

export const deleteProperty = async (id: string) => {
  const propertyToDelete = await PropertyModel.findByIdAndDelete(id);
  
  if(propertyToDelete) {
    await deleteFromCloudinary(propertyToDelete.images);
  }

  return {
    message: 'Property has been successfully deleted!',
  };
};

export const getGeneralStats = async () => {
  const totalPropertyCount = await PropertyModel.countDocuments();

  const topPropertyNumberRegion = await PropertyModel.aggregate([
    {
      $group: {
        _id: "$location.region",
        count: { $sum: 1 },
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  const averageBuyingPrice = await PropertyModel.aggregate([
    { $match: { type: "for_sale" } },
    {
      $group: {
        _id: "$market",
        avgPrice: { $avg: "$price" }
      }
    }
  ]);

  const averageRentPrice = await PropertyModel.aggregate([
    { $match: { type: "for_rent" } },
    {
      $group: {
        _id: "$market",
        avgPrice: { $avg: "$price" }
      }
    }
  ])

  return {
    totalPropertyCount, 
    topPropertyNumberRegion, 
    averageBuyingPrice,
    averageRentPrice,
  };
};

export type GetMonthlyPropertyStats = {
  type: "for_sale" | "for_rent",
};

export const getMonthlyPropertyStats = async ({ type }: GetMonthlyPropertyStats) => {
  const addedPropertiesByMonth = await PropertyModel.aggregate([
    {
      $match: {
        market: { $in: ["primary", "secondary"] },
        type
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        primaryCount: {
          $sum: {
            $cond: [{ $eq: ["$market", "primary"] }, 1, 0]
          }
        },
        secondaryCount: {
          $sum: {
            $cond: [{ $eq: ["$market", "secondary"] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
  return {
    addedPropertiesByMonth,
  };
};