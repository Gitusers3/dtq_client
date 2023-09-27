import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from '../../components';
import Tabs from '../material-kit/tabs/tabs.jsx';
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
          <Breadcrumb routeSegments={[{ name: 'Students' }]} />
        </Box>
        <SimpleCard title="Students">
          <Tabs />
          <Link to="/student/register">
            <Button variant="contained" fullWidth color="primary">
              Register
            </Button>
          </Link>
        </SimpleCard>
      </Container>
    </div>
  );
};

export default AppTable;
