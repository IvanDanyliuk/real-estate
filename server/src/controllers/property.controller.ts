import { OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";


export const getPropertiesHandler = catchErrors(async (req, res) => {
  console.log('GET PROPERTIES', req)
});

export const getPropertyByIdHandler = catchErrors(async (req, res) => {
  console.log('GET PROPERTY BY ID', req)
});

export const createPropertyHandler = catchErrors(async (req, res) => {
  console.log('CREATE A NEW PROPERTY', req.body);

  return res.status(OK).json({ message: 'New Property has been successfully created!' });
});

export const updatePropertyHandler = catchErrors(async (req, res) => {
  console.log('UPDATE PROPERTY', req)
});

export const deletePropertyHandler = catchErrors(async (req, res) => {

});