import { OK } from "../constants/http";
import { articleSchema } from "../schemas/blog.schema";
import { createArticle, deleteArticle, getArticle, getArticles, updateArticle } from "../services/blog.service";
import catchErrors from "../utils/catchErrors";

export const getArticlesHandler = catchErrors(async (req, res) => {
  const response = await getArticles({ 
    page: +req.query.page!, 
    itemsPerPage: +req.query.itemsPerPage! 
  });
  return res.status(OK).json(response);
});

export const getArticleHandler = catchErrors(async (req, res) => {
  console.log('GET ARTICLE CONTROLLER', req.params.id)
  const response = await getArticle(req.params.id);
  return res.status(OK).json(response);
});

export const addArticleHandler = catchErrors(async (req, res) => {
  const request = articleSchema.parse({
    ...req.body,
    images: req.files
  });
  const newArticle = await createArticle(request);

  return res.status(OK).json({ 
    payload: newArticle, 
    message: "New article has been successfully created!",
  });
});

export const updateArticleHandler = catchErrors(async (req, res) => {
  const request = articleSchema.parse({
    ...req.body,
    images: req.files,
  });
  const updatedArticle = await updateArticle({
    _id: req.body._id,
    ...request
  });

  return res.status(OK).json({
    payload: updatedArticle,
    message: "Article has been successfully updated",
  });
});

export const deleteArticleHandler = catchErrors(async (req, res) => {
  const response = await deleteArticle(req.params.id);
  return res.status(OK).json(response);
});