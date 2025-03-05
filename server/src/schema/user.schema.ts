import { gql } from "apollo-server-express";
import UserModel from "../models/User.model";
import { ResponseStatus } from "../utils/types";

export const TypeDefs = gql`
  type User {
    id: ID!
    name: String!
    role: String!
    email: String!
    phone: String!
    password: String!
    location: String
    profilePhoto: String
    likedProperties: [Property]
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    createUser(
      name: String!, 
      role: String!, 
      email: String!, 
      phone: String!, 
      password: String!, 
      location: String, 
      profilePhoto: String,
      likedProperties: [Property]
    ): User
  }
`;

export const userResolvers = {
  Query: {
    getUsers: async () => {
      return await UserModel.find().populate("likedProperties");
    },
    getUser: async (_: any, { id }: { id: string }) => {
      return await UserModel.findById(id).populate("likedProperties");
    },
  },
  Mutation: {
    createUser: async (_: any, {
      name, 
      role, 
      email, 
      phone, 
      password, 
      location, 
      profilePhoto, 
      likedProperties = []
    }: {
      name: string;
      role: string;
      email: string;
      phone: string;
      password: string;
      location: string;
      profilePhoto: string;
      likedProperties: [];
    }) => {
      try {
        const newUser = new UserModel({
          name, role, email, phone, password, location, profilePhoto, likedProperties
        });
        
        return {
          status: ResponseStatus.Succeeded,
          user: newUser,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          user: null,
          error: error.message,
        };
      }
    },
  },
};