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
import StaffMdb from './staffMdb';

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

const PaginationTable = (all) => {
  console.log(all + 'prop from tabs');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ marginTop: '20px' }}>
        <StaffMdb prop={all} />
      </Box>
    </div>
  );
};

export default PaginationTable;
