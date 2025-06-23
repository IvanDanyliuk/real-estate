import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetPostQuery } from '../../state/blogApi';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { Container } from '../../../../components/layout/Container/Container';
import { ImageList } from '../../../../components/ImageList/ImageList';
import useFormatDate from '../../../../hooks/useFormatDate';
import { styles } from './styles';


const ArticlePage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const formatDate = useFormatDate();
  
  const { data, isLoading, isError } = useGetPostQuery(id);

  if(isLoading) {
    return (
      <Loader />
    );
  }

  if(isError) {
    return (
      <Box sx={styles.notFound}>
        {t('pages.article.notFound')}
      </Box>
    );
  }

  return (
    <Container contentStyles={styles.container}>
      {data.images.length > 1 ? (
        <ImageList imageUrls={data.images} />
      ) : (
        <Box sx={styles.imageContainer}>
          <img src={data.images[0]} alt={data._id} />
        </Box>
      )}
      <Box sx={styles.header}>
        <Typography variant='h1'>
          {data.title}
        </Typography>
        <Typography>
          {formatDate(data.createdAt)}
        </Typography>
      </Box>
      <Typography>
        {data.content}
      </Typography>
    </Container>
  );
};

export default ArticlePage;