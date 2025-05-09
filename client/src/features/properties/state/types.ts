export interface PropertyFormData {
  title: string;
  price: number;
  location: {
    region: string;
    city: string;
    address: string;
    mapCoords: {
      lat: number;
      lng: number;
    };
  };
  type: string;
  market: string;
  author: string;
  description: string;
  images: any[];
  overview: {
    roomsNumber: number;
    propertyType: string;
    yearBuilt: number;
    floor?: number;
    numberOfFloors: number;
    area: number;
    withRenovation: string;
  };
  nearbyAmenities: {
    object: string;
    distanceTo: number;
  }[];
};

export interface PropertyType extends PropertyFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export interface CreatePropertyResponse {
  payload: PropertyType;
  message: string;
};

export interface GetPropertiesQuery { 
  page: number; 
  itemsPerPage: number; 
  filters?: any; 
  sortParams?: any; 
  userId?: string;
};