import Axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../../../global';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Fform from '../forms/Feesform';
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
  const [sid, setSid] = useState('');
  const [display, setDisplay] = useState([]);
  console.log(divprop?.fromDate);
  console.log(divprop?.toDate);
  useEffect(() => {
    async function fetchdata(){
      const token=await localStorage.getItem("accessToken")
      console.log("tok",token)
      URL.get('student/view',{headers:{"authToken":token}})
      .then((res) => {
        console.log("re",res);
        setDisplay(res.data.st);
        console.log(display);
      })
      .catch((err) => {
        console.log(err);
      });


    }
    fetchdata()
   
  }, []);


  console.log(display);
  const [centredModal, setCentredModal] = useState(false);

  const [deleteID, setDeleteID] = useState('');
  const [count, setCount] = useState(1);

  const toggleShow = (sid) => {
    setCentredModal(!centredModal);
    setCount((prevCount) => prevCount + 1);
    setSid(sid);
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
      const divisionFilter = divprop.divprop.props
        ? va?.division_id?.d_name === divprop.divprop.props
        : true;

      if (fromDate && toDate) {
        let admissionDate = new Date(va?.date_of_admission);
        let fromDateFilter = admissionDate >= fromDate;
        let toDateFilter = admissionDate <= toDate;
        return divisionFilter && fromDateFilter && toDateFilter;
      }
      return divisionFilter;
    })
    .map((item, index) => {
      console.log(item._id);
      return {
        serial: index + 1,
        college: item?.college_id?.c_name,
        student: item.student_name,
        contact: item.whatsup,
        division: item?.division_id?.d_name,
        fees: item.fees,
        actions: (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Item>
                  <Link to={`view/${item._id}`}>
                    <RemoveRedEyeIcon />
                  </Link>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <CurrencyRupeeIcon
                    style={{ color: 'green' }}
                    onClick={() => toggleShow(item._id)}
                  />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <DeleteOutlineIcon
                    style={{ color: 'red' }}
                    onClick={() => DeleteStudent(item._id)}
                  />
                </Item>
              </Grid>
            </Grid>
          </div>
        )
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
        label: 'College',
        field: 'college',
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
        label: 'Contact',
        field: 'contact',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Division',
        field: 'division',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Fees',
        field: 'fees',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
        width: 100
      }
    ],
    rows: datta
  };

  return (
    <>
      <MDBDataTable striped data={data} />
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Make reciepts</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => toggleClose()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Fform Sid={sid} count={count} setCentredModal={setCentredModal} />
            </MDBModalBody>
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
