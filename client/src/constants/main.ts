import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TownhouseIcon from '@mui/icons-material/HomeWork';
import DuplexIcon from '@mui/icons-material/HolidayVillage';
import LandPlotIcon from '@mui/icons-material/Fence';
import OfficeIcon from '@mui/icons-material/Business';


export enum USER_ROLES {
  User = 'user',
  Admin = 'admin',
};

export enum MARKET_TYPE {
  Primary = 'primary',
  Secondary = 'secondary',
};

export enum AD_TYPE {
  Sale = 'for_sale',
  Rent = 'for_rent',
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
    value: AD_TYPE.Sale,
    label: 'constants.adTypes.for_sale',
  },
  {
    value: AD_TYPE.Rent,
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
    label: 'constants.propertyTypes.house',
    icon: HouseIcon,
  },
  {
    value: 'apartment',
    label: 'constants.propertyTypes.apartment',
    icon: ApartmentIcon,
  },
  {
    value: 'townhouse',
    label: 'constants.propertyTypes.townhouse',
    icon: TownhouseIcon,
  },
  {
    value: 'duplex',
    label: 'constants.propertyTypes.duplex',
    icon: DuplexIcon,
  },
  {
    value: 'plot',
    label: 'constants.propertyTypes.plot',
    icon: LandPlotIcon,
  },
  {
    value: 'office',
    label: 'constants.propertyTypes.office',
    icon: OfficeIcon,
  },
];