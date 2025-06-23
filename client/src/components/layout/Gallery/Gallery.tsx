import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


interface GalleryProps {
  data: string[];
};


export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const { t } = useTranslation();
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  const formattedData = data.map(item => ({
    original: item,
    thumbnail: item,
  }));

  const handleGalleryOpen = () => {
    setIsGalleryOpen(!isGalleryOpen);
  };

  return (
    <>
      <Button onClick={handleGalleryOpen}>
        {t('pages.property.gallery.allImagesBtn')}
      </Button>
      <Dialog open={isGalleryOpen} onClose={handleGalleryOpen} maxWidth='md' >
        <DialogContent>
          <ImageGallery items={formattedData}  />
        </DialogContent>
      </Dialog>
    </>
  );
};