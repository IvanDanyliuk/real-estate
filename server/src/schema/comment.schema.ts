import { gql } from "apollo-server-express";
import CommentModel from "../models/Comment.model";
import { ResponseStatus } from "../utils/types";

export const TypeDefs = gql`
  type Comment {
    author: Author!
    content: String!
  }

  extends type Query {
    getCommentsForArticle(id: ID!): [Comment]
  }

  extends type Mutation {
    createComment(
      author: ID!
      content: String!
    ): Comment
  }
`;

export const commentResolvers = {
  Query: {
    getCommentsForArticle: async (_: any, { id }: { id: string }) => {
      try {
        const commentsForArticle = await CommentModel.find({ author: id }).populate("author");
        return {
          status: ResponseStatus.Succeeded,
          comments: commentsForArticle,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          comments: [],
          error: error.message,
        };
      }
    },
  },
  Mutation: {
    createComment: async (_: any, {
      author,
      content,
    }: {
      author: string;
      content: string;
    }) => {
      try {
        const newComment = new CommentModel({
          author,
          content,
        });
        await newComment.save();
        return {
          status: ResponseStatus.Succeeded,
          comment: newComment,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          comment: null,
          error: error.message,
        };
      }
    },
  },
};