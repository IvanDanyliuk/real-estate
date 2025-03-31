export enum USER_ROLES {
  User = 'user',
  Admin = 'admin',
};

export const MAX_IMAGE_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const AD_TYPES = [
  {
    value: 'for_sale',
    label: 'For sale',
  },
  {
    value: 'for_rent',
    label: 'For rent',
  },
];

export const PROPERTY_TYPES = [
  {
    value: 'house',
    label: 'House',
  },
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'townhouse',
    label: 'Townhouse',
  },
  {
    value: 'duplex',
    label: 'Duplex',
  },

];