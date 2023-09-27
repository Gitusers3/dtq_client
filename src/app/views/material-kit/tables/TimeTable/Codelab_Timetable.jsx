import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';


import CodeSimpletable from './CodeSimpletable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function Codelab_Timetable() {
  return (
<Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'CodeLab', path: '/batches' }, { name: 'Time Table' }]} />
      </Box>

      <SimpleCard title="Time Table">
        <CodeSimpletable/>
      </SimpleCard>

    
    </Container>
  )
}

export default Codelab_Timetable