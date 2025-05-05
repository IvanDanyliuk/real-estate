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
  { label: 'constants.months.jan', value: 1 }, 
  { label: 'constants.months.feb', value: 2 }, 
  { label: 'constants.months.mar', value: 3 }, 
  { label: 'constants.months.apr', value: 4 }, 
  { label: 'constants.months.may', value: 5 }, 
  { label: 'constants.months.jun', value: 6 }, 
  { label: 'constants.months.jul', value: 7 }, 
  { label: 'constants.months.aug', value: 8 }, 
  { label: 'constants.months.sep', value: 9 }, 
  { label: 'constants.months.oct', value: 10 }, 
  { label: 'constants.months.nov', value: 11 }, 
  { label: 'constants.months.dec', value: 12 },
];

export const AD_TYPES = [
  {
    value: 'for_sale',
    label: 'constants.adTypes.for_sale',
  },
  {
    value: 'for_rent',
    label: 'constants.adTypes.for_rent',
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