import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from '../../components';
import Fees_tab from '../material-kit/tabs/Fees_tab';
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
export default function Fees() {
  return (
    <div>
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Fees Reciept' }]} />
      </Box>
      <SimpleCard title="Fees Reciept">
       <Fees_tab/>
      
      </SimpleCard>
    </Container>
  </div>
  )
}



