import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

export const schema = buildSchema(`
  type Query {
    hello: String
  }  
`);

export const root = {
  hello: () => "Hello world!"
};

export const graphqlHandler = createHandler({ 
  schema, 
  rootValue: root,
  
});