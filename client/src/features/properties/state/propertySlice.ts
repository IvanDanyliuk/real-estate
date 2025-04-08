import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyType } from "./types";

interface InitialState {
  properties: PropertyType[];
};

const initialState: InitialState = {
  properties: [],
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<PropertyType[]>) => {
      state.properties = action.payload;
    },
    addProperty: (state, action: PayloadAction<PropertyType>) => {
      state.properties.pop();
      state.properties.unshift(action.payload);
    },
    updateProperty: (state, action: PayloadAction<PropertyType>) => {
      state.properties = state.properties.map(property => property._id === action.payload._id 
        ? action.payload 
        : property)
    },
  },
});

export const { setProperties, addProperty, updateProperty } = propertySlice.actions;
export default propertySlice.reducer;