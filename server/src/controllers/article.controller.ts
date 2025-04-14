import { OK } from "../constants/http";
import { articleSchema } from "../schemas/article.schema";
import { createArticle } from "../services/article.service";
import catchErrors from "../utils/catchErrors";

export const addArticle = catchErrors(async (req, res) => {
  const request = articleSchema.parse(req.body);
  const newArticle = await createArticle(request);

  return res.status(OK).json({ 
    payload: newArticle, 
    message: "New article has been successfully created!",
  });
});

export const updateArticle = catchErrors(async (req, res) => {
  const request = articleSchema.parse(req.body);
  
})