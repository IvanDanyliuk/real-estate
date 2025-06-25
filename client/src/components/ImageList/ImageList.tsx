import { Box, Grid2, Stack, useMediaQuery } from '@mui/material';
import { Gallery } from '../layout/Gallery/Gallery';
import { styles } from './styles';


interface ImageListProps {
  imageUrls: string[];
};


export const ImageList: React.FC<ImageListProps> = ({ imageUrls }) => {
  const isMobile = useMediaQuery('(max-width:599px)');
  
  return (
    <Box sx={styles.images}>
      <Grid2 
        container 
        spacing={1} 
        sx={styles.gallery}
      >
        <Grid2 
          size={isMobile ? 12 : 8} 
          sx={styles.column}
        >
          <Box sx={styles.mainImageItem}>
            <img 
              src={imageUrls[0]} 
              alt='main_image' 
            />
          </Box>
        </Grid2>
        <Grid2 
          size={isMobile ? 12 : 4} 
          sx={styles.column}
        >
          <Stack 
            spacing={1} 
            sx={styles.stack}
          >
            {imageUrls.slice(1, 4).map((item: string, i: number) => (
              <Box 
                key={`image_items_${i + 1}`} 
                sx={styles.imageItem}
              >
                <img src={item} alt={`image_${i + 1}`} />
                {(i === 3 || i === imageUrls.length - 2) && (
                  <Box sx={styles.link}>
                    <Gallery data={imageUrls} />
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  )
}