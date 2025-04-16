import { Router } from "express";
import { addArticleHandler, deleteArticleHandler, getArticlesHandler, updateArticleHandler } from "../controllers/blog.controller";
import { upload } from "../middleware/multer";


const router = Router();

router.get('/', getArticlesHandler);
router.get('/:id', getArticlesHandler);
router.post('/', upload.array('images'), addArticleHandler);
router.patch('/', upload.array('images'), updateArticleHandler);
router.delete('/:id', deleteArticleHandler);

export default router;