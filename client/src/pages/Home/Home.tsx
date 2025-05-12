import { Box, Container, Typography } from '@mui/material';
import { styles } from './styles';
import videoBg from '../../assets/video/hero-bg.mp4'
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <Box>
      <Box component='section' sx={styles.hero}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: -2, 
          }}
        >
          <source src={videoBg} type='video/mp4' />
        </video>
        <Container maxWidth='xl' sx={styles.container}>
          <Box sx={styles.introduction}>
            <Typography variant='h3'>
              Find your dream property easily
            </Typography>
            <Typography variant='h1'>
              Instant Property Deals:
              <Typography variant='caption'>
                Buy, Rent, and Rent
              </Typography>
            </Typography>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit 
              amet. Lorem ipsum dolor sit amet  Lorem ipsum dolor sit amet Lorem ipsum 
              dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem 
              ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
            </Typography>
            <Link to='/property'>
              Let's find your
              <Typography variant='caption'>
                Dream Property
              </Typography>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;