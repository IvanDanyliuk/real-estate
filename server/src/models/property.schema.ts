import { InferSchemaType, model, Schema } from "mongoose";

const propertySchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    city: { type: String, required: true },
    address: { type: String, requried: true },
    mapCoords: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  type: { type: String, requried: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  images: [{ type: String }],
  overview: {
    roomsNumber: { type: Number, required: true },
    yearBuilt: { type: Number, requried: true },
    type: { type: String, required: true },
    area: { type: Number, required: true },
  },
  nearbyAmenities: [{
    object: { type: String },
    distanceTo: { type: Number },
  }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, {
  timestamps: true,
});

export type PropertyType = InferSchemaType<typeof propertySchema>;
export default model<PropertyType>("Property", propertySchema)