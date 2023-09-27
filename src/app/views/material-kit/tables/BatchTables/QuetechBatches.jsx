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
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

export default function QuetechBatches(propid) {
  console.log(propid.propid);
  const [batch, SetBatch] = useState();
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
  }, []);
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
          url.delete(`batch/delete/${id}`)
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
  console.log("batch",batch)
  return  <div>
  <Box width="100%" overflow="auto">
   <StyledTable>
     <TableHead>
       <TableRow>
         <TableCell align="left">Sl No</TableCell>
         <TableCell align="center">Name</TableCell>
         <TableCell align="center">Techie</TableCell>
         <TableCell align="center">Project</TableCell>
         <TableCell align="center">College</TableCell>
         <TableCell align="center">Status</TableCell>
         <TableCell align="right">Action</TableCell>
       </TableRow>
     </TableHead>

     <TableBody>
       {batch
         ?.filter((va) => va?.d_id?._id === propid.propid)
         .map((item, index) => {
           const techNames = item.tech_id.map((tech) => tech.staff_name).join(', ');
           const project_title = item.project_id.map((pro) => pro.project_title).join(', ');
          

           return (
             <TableRow key={item._id}>
               <TableCell align="left">{index + 1}</TableCell>
               <TableCell align="center">{item.b_name}</TableCell>
               <TableCell align="center">{techNames}</TableCell>
               <TableCell align="center">{project_title}</TableCell>
               <TableCell align="center">{item.college_id.c_name}</TableCell>
               <TableCell align="center">{item.status}</TableCell>
               <TableCell align="right">
                 <IconButton>
                   <Icon onClick={() => DeleteBatch(item._id)} color="error">
                     delete
                   </Icon>
                 </IconButton>
               </TableCell>
             </TableRow>
           );
         })}
     </TableBody>
   </StyledTable>
   <Link to="qtech_create">
     <Button fullWidth sx={{ marginTop: '10px' }} variant="contained">
       Add Batch
     </Button>
   </Link>
   <Link to="time_table/qtech">
     <Button fullWidth sx={{ marginTop: '10px' }} variant="contained" color="success">
       Time Table
     </Button>
   </Link>
  
 </Box>
</div>;
}
