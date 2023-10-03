import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useState, useEffect } from 'react';
import url from '../../../../../global';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CLbatchview from './CLbatchview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

export default function CodelabBatches(propid) {
  console.log(propid.propid);
  const [batch, SetBatch] = useState();
  const [batchChange, SetBatchChange] = useState(false);

  useEffect(() => {
    url
      .get('batch/view')
      .then((res) => {
        console.log(res?.data);
        SetBatch(res?.data);
        console.log(batch);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [batchChange]);
  console.log(batch);
  const DeleteBatch = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          url
            .delete(`batch/delete/${id}`)
            .then((res) => {
              console.log(res);
              let newDisplay = batch.filter((item) => {
                return item._id !== id;
              });
              SetBatch(newDisplay);
            })
            .catch((err) => {
              console.log(err);
            });
          swalWithBootstrapButtons.fire('Deleted!', 'Batch has been deleted.', 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Batch record is safe :)', 'error');
        }
      });
  };
  return (
    <div>
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Sl No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Techie</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {batch
              ?.filter((va) => va?.d_id?._id === propid.propid)
              .map((item, index) => {
                const techNames = item.tech_id.map((tech) => tech.staff_name).join(', ');

                return (
                  <TableRow key={item._id}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="center">{item.b_name}</TableCell>
                    <TableCell align="center">{techNames}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    <TableCell align="right">
                      <div style={{ display: 'flex', marginLeft: '50px' }}>
                        <Link to={`viewStudents/${item._id}`}>
                          <Tooltip arrow title="View Students">
                            <IconButton>
                              <VisibilityIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <CLbatchview SetBatchChange={SetBatchChange} batch={item} />
                        <Tooltip arrow title="Delete Batch">
                          <IconButton>
                            <Icon onClick={() => DeleteBatch(item._id)} color="error">
                              delete
                            </Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </StyledTable>
        <Link to="create">
          <Button fullWidth sx={{ marginTop: '10px' }} variant="contained">
            Add Batch
          </Button>
        </Link>
        <Link to="time_table">
          <Button fullWidth sx={{ marginTop: '10px' }} variant="contained" color="success">
            View TimeTable
          </Button>
        </Link>
      </Box>
    </div>
  );
}
