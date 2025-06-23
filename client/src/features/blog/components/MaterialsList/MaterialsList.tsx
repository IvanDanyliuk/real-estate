import { Box, Grid2, Paper, Typography, useMediaQuery } from '@mui/material';
import { PostType } from '../../state/types';
import { styles } from './styles';
import { Link } from 'react-router';


interface MaterialsListProps {
  data: PostType[];
};


export const MaterialsList: React.FC<MaterialsListProps> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width:599px)');
  
  return (
    <Grid2 container spacing={2}>
      {data.map((article, i) => (
        <Grid2 
          key={article._id} 
          size={isMobile ? 12 : 6}
        >
          <Paper sx={styles.articleContainer}>
            <Link to={`/blog/${article._id}`}>
              <Box sx={styles.imageContainer}>
                <img src={article.images[0]} alt={article.title} />
              </Box>
              <Box sx={styles.textContentContainer}>
                <Typography variant='h6'>
                  {article.title}
                </Typography>
                <Typography sx={styles.textContent}>
                  {article.content}
                </Typography>
              </Box>
            </Link>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};