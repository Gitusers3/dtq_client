import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import Form from '../forms/TForm';
import MdbTable from './mdbTable';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const subscribarList = [
  {
    name: 'john doe',
    date: '18 january, 2019',
    amount: 1000,
    status: 'close',
    status: 'close',
    company: 'ABC Fintech LTD.'
  }
];

const PaginationTable = (propss) => {
  console.log(propss);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fdateTemp, setFdateTemp] = useState(''); // Temporary state for from date
  const [tdateTemp, setTdateTemp] = useState(''); // Temporary state for to date
  const [fdate, setFdate] = useState(''); // Final state for from date
  const [tdate, setTdate] = useState(''); // Final state for to date
  const [filter, setFilter] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    setFilter(true);
    // Update the final state variables when the form is submitted
    setFdate(fdateTemp);
    setTdate(tdateTemp);
  };

  const handleFromDateChange = (e) => {
    setFdateTemp(e.target.value);
  };

  const handleToDateChange = (e) => {
    setTdateTemp(e.target.value);
  };

  const handleChangefilter2 = () => {
    setFilter(false);
    setTdate('');
    setFdate('');
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Box width="100%" overflow="auto">
        <form onSubmit={Submit}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <InputLabel id="from-date-label">From</InputLabel>
              <TextField
                required
                type="date"
                id="from-date"
                fullWidth
                value={fdateTemp} // Use temporary state here
                onChange={handleFromDateChange}
              />
            </Grid>
            <Grid item xs={5}>
              <InputLabel id="to-date-label">To</InputLabel>
              <TextField
                required
                type="date"
                id="to-date"
                fullWidth
                value={tdateTemp} // Use temporary state here
                onChange={handleToDateChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                sx={{ padding: '15px', marginTop: '20px' }}
                variant="contained"
                fullWidth
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
              {filter === true ? (
                <>
                  <Button
                    type="reset"
                    sx={{ padding: '15px', marginTop: '20px' }}
                    variant="contained"
                    fullWidth
                    className="btn btn-danger"
                    onClick={handleChangefilter2}
                  >
                    Clear
                  </Button>
                </>
              ) : null}
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <MdbTable fromDate={fdate} toDate={tdate} divprop={propss} />
      </Box>
    </div>
  );
};

export default PaginationTable;
