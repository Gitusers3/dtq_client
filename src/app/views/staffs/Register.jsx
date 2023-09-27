import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

import StepperForm from '../material-kit/forms/StepperForm';
import Sidenav from '../../components/Sidenav';
import Staffform from '../material-kit/forms/Satffform';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Register = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Registration' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <Staffform/>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Register;
