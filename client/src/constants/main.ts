export enum USER_ROLES {
  User = 'user',
  Admin = 'admin',
};

export enum MARKET_TYPE {
  Primary = 'primary',
  Secondary = 'secondary',
};

export const MAX_IMAGE_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December',
];

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

export const MARKET_TYPES = [
  {
    value: MARKET_TYPE.Primary,
    label: 'Primary',
  },
  {
    value: MARKET_TYPE.Secondary,
    label: 'Secondary',
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