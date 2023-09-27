import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './css/print.css';
import PrintIcon from '@mui/icons-material/Print';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CogSimpleTable from './CogSimpleTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default function Cognitive_TimeTable() {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Print Page', // Optional title for the printed document
    onBeforePrint: () => {
      // Add any code you want to run before printing (optional)
    },
    onAfterPrint: () => {
      // Add any code you want to run after printing (optional)
    }
  });
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Cognitive', path: '/batches' }, { name: 'Time Table' }]}
        />
      </Box>
      <button className="btn btn-warning fw-bolder m-3" onClick={handlePrint}>
        <PrintIcon style={{ color: 'black', fontSize: '30px', cursor: 'pointer' }} />
        Print
      </button>
      <SimpleCard title="Time Table">
        <div className="printable-content d-block w-100 p-3" ref={printRef}>
          <CogSimpleTable />
        </div>
      </SimpleCard>
      <Link to="../../batches">
        <Button fullWidth sx={{ marginTop: '10px' }} color="error" variant="contained">
          Go back
        </Button>
      </Link>
    </Container>
  );
}
