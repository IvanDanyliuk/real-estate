import { Link } from 'react-router';
import { Box, Container, Typography } from '@mui/material';
import { SearchBox } from '../../features/properties/components/SearchBox/SearchBox';
import videoBg from '../../assets/video/hero-bg.mp4';
import { styles } from './styles';


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
        <Container maxWidth='lg' sx={styles.container}>
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
          <SearchBox />
        </Container>
      </Box>
      <Box component='section'>
        <Container maxWidth='lg'>
          <Box>
            <Typography variant='h3'>
              Property Types
            </Typography>
            <Typography variant='h2'>
              Explore 
              <Typography variant='caption'>
                Property Types
              </Typography>
            </Typography>
          </Box>
          <Box component='ul'>

          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;