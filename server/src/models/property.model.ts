import { InferSchemaType, model, Schema } from "mongoose";

const propertySchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    region: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, requried: true },
    mapCoords: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  type: { type: String },
  market: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  images: [{ type: String }],
  overview: {
    roomsNumber: { type: Number, required: true },
    propertyType: { type: String, requried: true },
    yearBuilt: { type: Number, requried: true },
    floor: { type: String },
    numberOfFloors: { type: Number },
    area: { type: Number, required: true },
    withRenovation: { type: String },
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