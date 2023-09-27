import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from '../../components';
import Tabs from '../material-kit/tabs/deptTab';
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

const AppTable = () => {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Batches' }]} />
        </Box>
        <SimpleCard title="Batches">
          <Tabs />
        </SimpleCard>
      </Container>
    </div>
  );
};

export default AppTable;
