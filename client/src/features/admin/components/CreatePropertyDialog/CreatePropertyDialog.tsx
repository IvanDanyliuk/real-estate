import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PropertyDataType } from '../../data-models';
import { useCreatePropertyMutation } from '../../../properties/state/propertyApi';
import { PropertyForm } from '../forms/PropertyForm/PropertyForm';
import { statusToast } from '../../../../components/toast/toast';
import { styles } from './styles';


const initialState: PropertyDataType = {
  title: '',
  price: 0,
  location: {
    city: '',
    address: '',
    mapCoords: {
      lat: 0,
      lng: 0,
    },
  },
  adType: '',
  description: '',
  images: undefined,
  overview: {
    roomsNumber: 0,
    propertyType: '',
    yearBuilt: new Date().getFullYear(),
    floor: 0,
    numberOfFloors: 1,
    area: 0,
    withRenovation: 'yes',
  },
  nearbyAmenities: [],
};


export const CreatePropertyDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [createProperty, { isLoading }] = useCreatePropertyMutation();

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateProperty = async (propertyData: FormData) => {
    const { data, error } = await createProperty(propertyData);
    // TODO: Set response to the state
    console.log('CREATE')

    if(data && data.payload) {
      statusToast({ 
        type: 'success', 
        message: data.message 
      });
    }
    if(error) {
      statusToast({
        type: 'error',
        message: 'Failed to create a new property',
      });
    }
    
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip title='Create a new property'>
        <IconButton onClick={handleMenuOpen} sx={styles.openBtn}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleMenuOpen} maxWidth='xl'>
        <DialogTitle sx={styles.dialogHeading}>Create a new property</DialogTitle>
        <DialogContent>
          <PropertyForm 
            initialData={initialState} 
            onSubmit={handleCreateProperty} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};