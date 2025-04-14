import { deleteFromCloudinary, uploadToCloudinary } from "./cloudinary.service";
import ArticleModel from "../models/blog.schema";

export type GetPropertiesParams = {
  page: number,
  itemsPerPage: number,
}

export const getArticles = async ({ page, itemsPerPage }: GetPropertiesParams) => {
  const articles = await ArticleModel
    .find({ page, itemsPerPage })
    .sort({ "createdAt": -1 })
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec();

  const count = await ArticleModel.countDocuments();

  return {
    articles,
    count,
  };
};

export const getArticle = async (id: string) => {
  const article = await ArticleModel.findById(id);
  return article;
};

interface NewArticleParams {
  title: string;
  content: string;
  images?: any[];
};

export const createArticle = async (data: NewArticleParams) => {
  const uploadedImages = data.images && data.images.length > 0 
    ? await Promise.all(data.images.map((image: any) => uploadToCloudinary(image.buffer))) 
    : [];

  const newArticle = await ArticleModel.create({
    ...data,
    images: uploadedImages,
  });

  return newArticle;
};

interface UpdateArticleParams  extends NewArticleParams {
  _id: string;
}

export const updateArticle = async (articleToUpdate: UpdateArticleParams) => {
  const existingArticle = await ArticleModel.findById(articleToUpdate._id);

  const updatedImages = articleToUpdate.images && articleToUpdate.images.length > 0 
    ? await Promise.all(articleToUpdate.images.map((image: any) => uploadToCloudinary(image.buffer))) 
    : null;

  const updatedArticle = await ArticleModel.findByIdAndUpdate(articleToUpdate._id, {
    ...articleToUpdate,
    images: updatedImages || existingArticle!.images,
  });

  return updatedArticle;
};

export const deleteArticle = async (id: string) => {
  const deletedArticle = await ArticleModel.findByIdAndDelete(id);

  if(deletedArticle) {
    await deleteFromCloudinary(deletedArticle.images);
  }

  return {
    message: "Article has been successfully deleted!",
  };
};