import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Cog_Form from './Cog_Form';
// import SimpleForm from './SimpleForm';
// import StepperForm from './StepperForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function AddCogTimeTable() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Time Table', path: '../../batches/time_table' },
            { name: 'Cognitive' }
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Time Table Form">
          {/* <SimpleForm /> */}
          <Cog_Form />
        </SimpleCard>
      </Stack>
    </Container>
  );
}

export default AddCogTimeTable;
