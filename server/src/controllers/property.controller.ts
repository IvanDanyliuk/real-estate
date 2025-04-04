import { propertySchema } from "../schemas/property.schema";
import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";
import { createProperty } from "../services/property.service";

export const getPropertiesHandler = catchErrors(async (req, res) => {
  console.log('GET PROPERTIES', req)
});

export const getPropertyByIdHandler = catchErrors(async (req, res) => {
  console.log('GET PROPERTY BY ID', req)
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
    message: 'New property has been successfully created!',
  });
});

export const updatePropertyHandler = catchErrors(async (req, res) => {
  console.log('UPDATE PROPERTY', req)
});

export const deletePropertyHandler = catchErrors(async (req, res) => {

});