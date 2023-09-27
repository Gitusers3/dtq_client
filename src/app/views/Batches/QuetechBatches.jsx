import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import BatchForm from '../material-kit/forms/batchfrom/CreateBatchForm';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default function QuetechBatches() {
  return  <Container>
  <Box className="breadcrumb">
    <Breadcrumb routeSegments={[{ name: 'New Batch' }]} />
  </Box>

  <Stack spacing={3}>
    <SimpleCard>
      <BatchForm />
    </SimpleCard>
  </Stack>
</Container>;
}
