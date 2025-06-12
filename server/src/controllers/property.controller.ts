import { propertySchema } from "../schemas/property.schema";
import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";
import { createProperty, deleteProperty, getGeneralStats, getLikedPropertiesByUser, getMonthlyPriceStats, getMonthlyPropertyStats, getPopularProperties, getProperties, getPropertyById, getPropertyStatsByRegion, getUserProperties, updateProperty } from "../services/property.service";
import { removeFalseyFields } from "../utils/removeFlaseyFields";

type FiltersType = {
  price?: {
    $gte?: number,
    $lte?: number,
  },
  "location.region"?: {
    $in: string[];
  },
  market?: {
    $in: string[];
  },
  "overview.propertyType"?: {
    $in: string[]
  },
  "overview.area"?: {
    $gte?: number,
    $lte?: number,
  },
  type?: {
    $in: string[]
  },
};

export const getPropertiesHandler = catchErrors(async (req, res) => {
  const parsedFilters = req.query.filters ? JSON.parse(req.query.filters.toString()) : {};
  
  const filters: FiltersType = {};

  if(parsedFilters.price) {
    filters.price = {
      $gte: +parsedFilters.price[0],
      $lte: +parsedFilters.price[1],
    };

    if(Object.keys(filters.price).length === 0) delete filters.price;
  }

  if(parsedFilters["location.region"]) {
    filters["location.region"] = {
      $in: parsedFilters["location.region"]
    }
  }

  if(parsedFilters["overview.propertyType"]) {
    filters["overview.propertyType"] = {
      $in: parsedFilters["overview.propertyType"]
    }
  };

  if(parsedFilters["overview.area"]) {
    filters["overview.area"] = {
      $gte: +parsedFilters["overview.area"][0],
      $lte: +parsedFilters["overview.area"][1],
    };
  }

  if(parsedFilters.market) {
    filters.market = {
      $in: parsedFilters.market
    };
  }

  if(parsedFilters.type) {
    filters.type = {
      $in: parsedFilters.type
    }
  }

  const orderBy = req.query.orderBy 
    ? req.query.orderBy.toString() 
    : "createdAt";
  const order = !req.query.order 
    ? -1 
    : req.query.order.toString() === "desc" 
      ? -1 
      : 1; 

  const response = await getProperties({
    page: +req.query.page!,
    itemsPerPage: +req.query.itemsPerPage!,
    filters,
    sortParams: { [orderBy]: order },
  });

  return res.status(OK).json(response);
});

export const getLikedPropertiesByUserHandler = catchErrors(async (req, res) => {
  const response = await getLikedPropertiesByUser({
    page: +req.query.page!,
    itemsPerPage: +req.query.itemsPerPage!,
    userId: req.query.userId!.toString(),
  });

  return res.status(OK).json(response);
})

export const getPropertyByIdHandler = catchErrors(async (req, res) => {
  console.log('GET PROPERTY BY ID', req)
  // const response = await getPropertyById()
});

export const getUserPropertiesHandler = catchErrors(async (req, res) => {
  const { email, itemsPerPage, page } = req.query;
  const query = {
    email: email!.toString(),
    itemsPerPage: +itemsPerPage!,
    page: +page!,
  };
  
  const response = await getUserProperties(query);
  return res.status(OK).json(response);
});

export const getPopularPropertiesHandler = catchErrors(async (req, res) => {
  const { limit } = req.query;
  const limitValue = limit ? +limit : 8;

  const response = await getPopularProperties(limitValue);
  return res.status(OK).json(response);
});

export const createPropertyHandler = catchErrors(async (req, res) => {
  const transformedBody = {
    ...req.body,
    price: +req.body.price,
    images: req.files,
    location: JSON.parse(req.body.location),
    overview: JSON.parse(req.body.overview),
    nearbyAmenities: JSON.parse(req.body.nearbyAmenities),
  };

  const request = propertySchema.parse(transformedBody);
  const response = await createProperty(request);

  return res.status(OK).json({
    payload: response,
    message: "New property has been successfully created!",
  });
});

export const updatePropertyHandler = catchErrors(async (req, res) => {
  const transformedBody = removeFalseyFields({
    ...req.body,
    price: +req.body.price,
    images: req.files,
    location: JSON.parse(req.body.location),
    overview: JSON.parse(req.body.overview),
    nearbyAmenities: JSON.parse(req.body.nearbyAmenities),
  });

  const request = propertySchema.parse(transformedBody);
  const updatedProperty = await updateProperty({
    _id: req.body._id,
    ...request
  });

  return res.status(OK).json({ 
    payload: updatedProperty, 
    message: 'Property has been successfully updated!' 
  });
});

export const deletePropertyHandler = catchErrors(async (req, res) => {
  const response = await deleteProperty(req.params.id);
  return res.status(OK).json(response);
});

export const getGeneralStatsHandler = catchErrors(async (req, res) => {
  const response = await getGeneralStats();
  return res.status(OK).json(response);
});

export const getMonthlyPropertyStatsHandler = catchErrors(async (req, res) => {
  const type = req.query.type 
    ? req.query.type.toString() 
    : 'for_sale';
  const currentYear = new Date().getFullYear();
  const year = req.query.year ? +req.query.year : currentYear;

  const response = await getMonthlyPropertyStats({ type, year });
  return res.status(OK).json(response);
});

export const getPropertyStatsByRegionHandler = catchErrors(async (req, res) => {
  const type = req.query.type 
    ? req.query.type.toString() 
    : 'for_sale';
  const currentYear = new Date().getFullYear();
  const year = req.query.year ? +req.query.year : currentYear;

  const response = await getPropertyStatsByRegion({ type, year });
  return res.status(OK).json(response);
});

export const getMonthlyAveragePriceStatsHandler = catchErrors(async (req, res) => {
  const region = req.query.region 
    ? req.query.region.toString() 
    : 'All';
  const currentYear = new Date().getFullYear();
  const year = req.query.year ? +req.query.year : currentYear;

  const response = await getMonthlyPriceStats({ region, year });
  return res.status(OK).json(response);
});
