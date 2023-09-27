import Axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../../../../../global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Swal from 'sweetalert2';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const DatatablePage = (divprop) => {
  const [display, setDisplay] = useState([]);
  console.log(divprop.clg);
  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      URL.get('student/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res);
          setDisplay(res.data.st);
          console.log(display);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, []);
  console.log(display);
  const [centredModal, setCentredModal] = useState(false);
  const [sid, setSid] = useState();

  const [deleteID, setDeleteID] = useState('');
  const [count, setCount] = useState(1);

  const toggleShow = (sid) => {
    setCentredModal(!centredModal);
    setCount((prevCount) => prevCount + 1);
    return setSid(sid);
  };
  const toggleClose = () => {
    setCentredModal(!centredModal);
  };
  const DeleteStudent = (id) => {
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
          Axios.delete(`http://localhost:4000/api/student/delete/${id}`)
            .then((res) => {
              console.log(res);
              let newDisplay = display.filter((item) => {
                return item._id !== id;
              });
              setDisplay(newDisplay);
            })
            .catch((err) => {
              console.log(err);
            });
          swalWithBootstrapButtons.fire('Deleted!', 'Student has been deleted.', 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Student record is safe :)', 'error');
        }
      });
  };

  let fromDate = divprop?.fromDate ? new Date(divprop.fromDate) : null;
  let toDate = divprop?.toDate ? new Date(divprop.toDate) : null;

  const datta = display
    ?.filter((va) => {
      const divisionFilter = divprop?.divprop?.props
        ? va?.division_id?.d_name === divprop?.divprop?.props
        : true;

      if (fromDate && toDate) {
        let admissionDate = new Date(va?.date_of_admission);
        let fromDateFilter = admissionDate >= fromDate;
        let toDateFilter = admissionDate <= toDate;
        return divisionFilter && fromDateFilter && toDateFilter;
      }
      return divisionFilter;
    })
    ?.filter((va) => {
      // Third filter - filter based on college ID (assuming college_id is a property in the 'va' object)
      return divprop?.clg ? va?.college_id?.c_name === divprop?.clg : true; // If no college ID in prop, no need to filter
    })
    .filter((va) => {
      // Second filter - filter based on student status (assuming all_status is a property in the 'va' object)
      return va?.all_status === 'Discontinued';
    })
    .map((item, index) => {
      console.log(item._id);
      const paidFees = item.fees - item.pending_fees;
      return {
        serial: index + 1,
        project: item?.project_id?.project_title,
        student: (
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/student/students/view/${item._id}`}
          >
            {item.student_name}
          </Link>
        ),
        total_fees: item.fees,
        paid_fees: paidFees,
        pending_fees: item.pending_fees
        // actions: (
        //   <div>
        //     <Grid container spacing={3}>
        //       <Grid item xs={4}>
        //         <Item>
        //           <Link to={`view/${item._id}`}>
        //             <RemoveRedEyeIcon />
        //           </Link>
        //         </Item>
        //       </Grid>
        //       <Grid item xs={4}>
        //         <Item>
        //           <CurrencyRupeeIcon
        //             style={{ color: 'green' }}
        //             onClick={() => toggleShow(item._id)}
        //           />
        //         </Item>
        //       </Grid>
        //       <Grid item xs={4}>
        //         <Item>
        //           <DeleteOutlineIcon
        //             style={{ color: 'red' }}
        //             onClick={() => DeleteStudent(item._id)}
        //           />
        //         </Item>
        //       </Grid>
        //     </Grid>
        //   </div>
        // )
      };
    });
  const data = {
    columns: [
      {
        label: 'Sl No',
        field: 'serial',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Project',
        field: 'project',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Student',
        field: 'student',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Total Fees',
        field: 'total_fees',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Fees Paid',
        field: 'paid_fees',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Pending Fees',
        field: 'pending_fees',
        sort: 'asc',
        width: 100
      }
    ],
    rows: datta
  };

  return (
    <>
      <MDBDataTable data={data} />
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Make reciepts</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => toggleClose()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody></MDBModalBody>
            {/* <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save</MDBBtn>
            </MDBModalFooter> */}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DatatablePage;
