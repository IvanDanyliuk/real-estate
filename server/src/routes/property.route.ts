import { Router } from "express";
import { 
  createPropertyHandler, 
  deletePropertyHandler, 
  getGeneralStatsHandler, 
  getMonthlyPropertyStatsHandler, 
  getPropertiesHandler, 
  getPropertyByIdHandler, 
  getPropertyStatsByRegionHandler, 
  updatePropertyHandler 
} from "../controllers/property.controller";
import { upload } from "../middleware/multer";


const propertyRoutes = Router();

propertyRoutes.get('/', getPropertiesHandler);
propertyRoutes.get('/stats/general', getGeneralStatsHandler);
propertyRoutes.get('/stats/monthly', getMonthlyPropertyStatsHandler);
propertyRoutes.get('/stats/regions', getPropertyStatsByRegionHandler);
propertyRoutes.get('/:id', getPropertyByIdHandler);
propertyRoutes.post('/', upload.array('images'), createPropertyHandler);
propertyRoutes.patch('/', upload.array('images'), updatePropertyHandler);
propertyRoutes.delete('/:id', deletePropertyHandler);

export default propertyRoutes;