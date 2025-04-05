import { propertySchema } from "../schemas/property.schema";
import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";
import { createProperty, getProperties } from "../services/property.service";

type FiltersType = {
  price?: {
    $gte?: number,
    $lte?: number,
  },
  "location.city"?: string,
  "overview.roomsNumber"?: number,
  "overview.propertyType"?: string,
  "overview.yearBuilt"?: number,
  "overview.area"?: number,
  "overview.withRenovation"?: string,
  adType?: string,
};

export const getPropertiesHandler = catchErrors(async (req, res) => {
  const filters: FiltersType = {};

  if(req.query.priceFrom || req.query.priceTo) {
    filters.price = {};
    if(req.query.priceFrom) filters.price.$gte = +req.query.priceFrom;
    if(req.query.priceTo) filters.price.$lte = +req.query.priceTo;

    if(Object.keys(filters.price).length === 0) delete filters.price;
  }

  if(req.query.city) {
    filters["location.city"] = req.query.city.toString();
  }

  if(req.query.adType) filters.adType = req.query.adType.toString();

  if(req.query.area) filters["overview.area"] = +req.query.area;
  if(req.query.roomsNumber) filters["overview.roomsNumber"] = +req.query.roomsNumber;
  if(req.query.propertyType) filters["overview.propertyType"] = req.query.propertyType.toString();
  if(req.query.yearBuilt) filters["overview.yearBuilt"] = +req.query.yearBuilt;
  if(req.query.withRenovation) filters["overview.withRenovation"] = req.query.withRenovation.toString();

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

export const getPropertyByIdHandler = catchErrors(async (req, res) => {
  console.log("GET PROPERTY BY ID", req)
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
  console.log("UPDATE PROPERTY", req)
});

export const deletePropertyHandler = catchErrors(async (req, res) => {

});