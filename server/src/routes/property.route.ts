import { Router } from "express";
import { 
  createPropertyHandler, 
  deletePropertyHandler, 
  getFiltersInitialValuesHandler, 
  getGeneralStatsHandler, 
  getLikedPropertiesByUserHandler, 
  getMonthlyAveragePriceStatsHandler, 
  getMonthlyPropertyStatsHandler, 
  getPopularPropertiesHandler, 
  getPropertiesHandler, 
  getPropertyByIdHandler, 
  getPropertyStatsByRegionHandler, 
  getUserPropertiesHandler, 
  updatePropertyHandler 
} from "../controllers/property.controller";
import { upload } from "../middleware/multer";


const propertyRoutes = Router();

propertyRoutes.get('/', getPropertiesHandler);
propertyRoutes.get('/stats/general', getGeneralStatsHandler);
propertyRoutes.get('/stats/monthly', getMonthlyPropertyStatsHandler);
propertyRoutes.get('/stats/regions', getPropertyStatsByRegionHandler);
propertyRoutes.get('/stats/prices', getMonthlyAveragePriceStatsHandler);
propertyRoutes.get('/popular', getPopularPropertiesHandler);
propertyRoutes.get('/own', getUserPropertiesHandler);
propertyRoutes.get('/liked', getLikedPropertiesByUserHandler);
propertyRoutes.get('/filters', getFiltersInitialValuesHandler);
propertyRoutes.get('/:id', getPropertyByIdHandler);
propertyRoutes.post('/', upload.array('images'), createPropertyHandler);
propertyRoutes.patch('/', upload.array('images'), updatePropertyHandler);
propertyRoutes.delete('/:id', deletePropertyHandler);

export default propertyRoutes;