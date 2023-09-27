import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Cog_Form from './Cog_Form';
import Qtech_Form from './Qtech_Form';
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


function AddQTimeTable() {
  return (
    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: 'Time Table', path: '../../batches/time_table/qtech' }, { name: 'Qtech' }]} />
    </Box>

    <Stack spacing={3}>
      <SimpleCard title="Time Table Form">
      
      <Qtech_Form/>
      </SimpleCard>


    </Stack>
  </Container>
  )
}

export default AddQTimeTable