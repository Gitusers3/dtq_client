import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from '../../../components';
import Tabreports from '../../material-kit/tabs/tabreport';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Ongoing = () => {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Students' }]} />
        </Box>
        <SimpleCard title="Students">
          <Tabreports />
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Ongoing;
