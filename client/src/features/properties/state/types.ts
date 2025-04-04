export interface PropertyFormData {
  title: string;
  price: number;
  location: {
    city: string;
    address: string;
    mapCoords: {
      lat: number;
      lng: number;
    };
  };
  adType: string;
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
    isRenovated: boolean;
  };
  nearbyAmenities: {
    object: string;
    distanceTo: number;
  }[];
};

export interface CreatePropertyResponse {
  payload: PropertyFormData;
  message: string;
};