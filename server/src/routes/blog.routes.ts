import { Router } from "express";
import { addArticleHandler, deleteArticleHandler, getArticlesHandler, updateArticleHandler } from "../controllers/blog.controller";
import { upload } from "../middleware/multer";


const router = Router();

router.get('/blog', getArticlesHandler);
router.get('/blog/:id', getArticlesHandler);
router.post('/blog', upload.array('images'), addArticleHandler);
router.patch('/blog', upload.array('images'), updateArticleHandler);
router.delete('/blog/:id', deleteArticleHandler);

export default router;