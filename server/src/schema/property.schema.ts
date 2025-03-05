import { gql } from "apollo-server-express";
import PropertyModel from "../models/Property.model";
import { ResponseStatus } from "../utils/types";

export const TypeDefs = gql`
  type Property {
    id: ID!
    title: String!
    price: Float!
    location: Location!
    type: String
    author: User
    description: String
    images: String
    overview: String
    nearbyAmenities: [Amenity]
    comments: [Comment]
  }

  type Location {
    city: String!
    address: String!
    mapCoords: MapCoords
  }

  type MapCoords {
    lat: String!
    lng: String!
  }

  type Amenity {
    object: String!
    distanceTo: Number!
  }

  type Comment {
    author: User
    content: String!
  }

  extend type Query {
    getProperties: [Property]
    getProperty(id: ID!): Property
  }

  extend type Mutation {
    createProperty(
      title: String!,
      price: Float!,
      location: Location!
      type: String
      author: User
      description: String
      images: String
      overview: String
      nearbyAmenities: []
      comments: []
    ): Property
  }
`;

export const PropertyResolvers = {
  Query: {
    getProperties: async () => {
      try {
        const properties = await PropertyModel.find().populate("author").populate("comments");
        return {
          status: ResponseStatus.Succeeded,
          properties,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          properties: [],
          error: error.message,
        };
      }
    },
    getProperty: async (_: any, { id }: { id: string }) => {
      try {
        const property = await PropertyModel.findById(id).populate("author").populate("comments");
        return {
          status: ResponseStatus.Succeeded,
          property,
          error: null,
        };
      } catch (error: any) {
        return {
          status: ResponseStatus.Failed,
          property: null,
          error: error.message,
        };
      }
    },
  },
  Mutation: {
    createProperty: async (_: any, {
      title,
      price,
      location,
      type,
      author,
      description,
      images,
      overview,
      nearbyAmenities= [],
      comments = [],
    }: {
      title: string;
      price: string;
      location: string;
      type: string;
      author: string;
      description: string;
      images: string;
      overview: string;
      nearbyAmenities: [];
      comments: [];
    }) => {
      try {
        const newProperty = new PropertyModel({
          title,
          price,
          location,
          type,
          author,
          description,
          images,
          overview,
          nearbyAmenities,
          comments,
        });
        await newProperty.save();
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