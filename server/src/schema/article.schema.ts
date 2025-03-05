import { gql } from "apollo-server-express";
import ArticleModel from "../models/Article.model";
import { ResponseStatus } from "../utils/types";

export const TypeDefs = gql`
  type Article {
    id: ID!
    title: String!
    content: String!
    image: String!
  }

  extend type Query {
    getArticles: [Article]
    getArticle(id: ID!): Article
  }

  extend type Mutation {
    createArticle(
      title: String!
      content: String!
      image: String!
    ): Article
  }
`;

export const ArticleResolvers = {
  Query: {
    getArticles: async () => {
      try {
        const articles = await ArticleModel.find();
        return {
          status: ResponseStatus.Succeeded,
          articles,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          articles: [],
          error: error.message,
        }
      }
    },
    getArticle: async (_: any, { id }: { id: string }) => {
      try {
        const article = await ArticleModel.findById(id);
        return {
          status: ResponseStatus.Succeeded,
          article,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          article: null,
          error: error.message,
        };
      }
    },
  },
  Mutation: {
    createArticle: async (_: any, {
      title,
      content,
      image,
    }: {
      title: string;
      content: string;
      image: string;
    }) => {
      try {
        const newArticle = new ArticleModel({
          title,
          content,
          image,
        });
        await newArticle.save();
        return {
          status: ResponseStatus.Succeeded,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          error: error.message,
        };
      }
    }
  },
};