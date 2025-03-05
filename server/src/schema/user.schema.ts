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
      try {
        const users = await UserModel.find().populate("likedProperties");
        return {
          status: ResponseStatus.Succeeded,
          users,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          users: [],
          error: error.message,
        };
      }
    },
    getUser: async (_: any, { id }: { id: string }) => {
      try {
        const user = await UserModel.findById(id).populate("likedProperties");
        return {
          status: ResponseStatus.Succeeded,
          user,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          user: null,
          error: error.message,
        }
      }
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
        await newUser.save();
        
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