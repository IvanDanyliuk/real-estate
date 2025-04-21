import { Router } from "express";
import { 
  createPropertyHandler, 
  deletePropertyHandler, 
  getGeneralStatsHandler, 
  getPropertiesHandler, 
  getPropertyByIdHandler, 
  updatePropertyHandler 
} from "../controllers/property.controller";
import { upload } from "../middleware/multer";


const propertyRoutes = Router();

propertyRoutes.get('/', getPropertiesHandler);
propertyRoutes.get('/stats', getGeneralStatsHandler);
propertyRoutes.get('/:id', getPropertyByIdHandler);
propertyRoutes.post('/', upload.array('images'), createPropertyHandler);
propertyRoutes.patch('/', upload.array('images'), updatePropertyHandler);
propertyRoutes.delete('/:id', deletePropertyHandler);

export default propertyRoutes;