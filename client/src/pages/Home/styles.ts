import { StyleProps } from '../../components/types';

export const styles: StyleProps = {
  heroContainer: {
    margin: '0 auto',
    minHeight: '92vh',
    position: 'relative',
  },
  hero: {
    position: 'relative',
    padding: '0 1rem',
    width: '100%',
    minHeight: '100%  ',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3 )',
      zIndex: -1,
    },
    '@media(min-width:600px)': {
      padding: 0,
    },
  },
  introduction: {
    position: 'relative',
    margin: '20rem 0 10rem 0',
    padding: '2rem',
    maxWidth: '35rem',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '10px',
    '& h1': {
      marginTop: '1.5rem',
      fontSize: '2rem',
      fontWeight: 500,
      fontStyle: 'italic',
      lineHeight: '1.5rem',
      '& span': {
        display: 'block',
        fontSize: '2rem',
        fontWeight: 600,
        fontStyle: 'normal',
        color: 'primary.main'
      }
    },
    '& h3': {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontSize: '1.1rem',
      fontWeight: 500,
      '&:before': {
        content: '""',
        width: '3rem',
        height: '2px',
        backgroundColor: 'primary.main'
      }
    },
    '& p': {
      margin: '1.2rem 0',
    },
    '& a': {
      fontSize: '1.3rem',
      color: 'secondary.dark',
      '& span': {
        marginLeft: '0.3rem',
        fontSize: '1.3rem',
        fontWeight: 600,
        color: 'primary.main',
      }
    },
    '@media(min-width:600px)': {
      position: 'absolute',
      top: '10vh',
      left: 0,
      margin: 0,
      backgroundColor: 'primary.light',
      '& h1': {
        marginTop: '1.5rem',
        fontSize: '2rem',
        fontWeight: 500,
        fontStyle: 'italic',
        lineHeight: '1.5rem',
        '& span': {
          display: 'block',
          fontSize: '2rem',
          fontWeight: 600,
          fontStyle: 'normal',
          color: 'primary.main'
        }
      },
      '& h3': {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontSize: '1.1rem',
        fontWeight: 500,
        '&:before': {
          content: '""',
          width: '3rem',
          height: '2px',
          backgroundColor: 'primary.main'
        }
      },
      '& p': {
        margin: '1.2rem 0',
      },
      '& a': {
        fontSize: '1.3rem',
        color: 'secondary.dark',
        '& span': {
          marginLeft: '0.3rem',
          fontSize: '1.3rem',
          fontWeight: 600,
          color: 'primary.main',
        }
      },
    },
  },
  sectionHeading: {
    padding: '1rem',
    '& h3': {
      position: 'relative',
      paddingLeft: '3.5rem',
      width: 'content-fit',
      fontSize: '1.4rem',
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '0.7rem',
        width: '3rem',
        height: '3px',
        backgroundColor: 'primary.main'
      }
    },
    '& h2': {
      display: 'inline',
      fontSize: '2rem',
      fontWeight: 500,
      '& span': {
        marginLeft: '0.5rem',
        fontSize: 'inherit',
        fontStyle: 'italic',
      }
    },
    '@media(min-width: 600px)': {
      padding: 0,
    }
  },
  sectionHeadingCenterred: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  commonContainer: {
    position: 'relative',
    padding: '3rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3rem'
  },
  popularPropertiesSection: {
    backgroundColor: 'secondary.light'
  },
  popularPropertiesHeadingContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllLink: {
    padding: '0 1.5rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'primary.main',
    color: 'primary.light',
    borderRadius: '1rem',
    transition: 'ease-in-out all 0.5s',
    '&:hover': {
      opacity: 0.8,
    },
  }
};