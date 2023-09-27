import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

import Code_Form from './Code_Form';


const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));


function AddCodeTimetable() {
  return (
    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: 'Time Table', path: '../../batches/time_table/codelab' }, { name: 'Codelab' }]} />
    </Box>

    <Stack spacing={3}>
      <SimpleCard title="Time Table Form">
    
        <Code_Form/>
      </SimpleCard>


    </Stack>
  </Container>
  )
}

export default AddCodeTimetable