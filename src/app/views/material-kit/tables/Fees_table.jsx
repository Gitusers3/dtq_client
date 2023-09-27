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
import PreviewIcon from '@mui/icons-material/Preview';
import PrintIcon from '@mui/icons-material/Print';
import Fform from '../forms/Feesform';
import Fees_Reciept from '../forms/Fees_Reciept';
import Swal from 'sweetalert2';
import Cs from '../../../../images/CS.png';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
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
import url from '../../../../global';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function Fees_table(divprop) {
  const [display, setDisplay] = useState([]);

  console.log('divprop in fees', divprop);
  useEffect(() => {
    URL.get('fees/view_fees')
      .then((res) => {
        console.log('datafees', res.data);
        setDisplay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('display', display);
  const [centredModal, setCentredModal] = useState(false);
  const [fid, setFid] = useState('');
  const [totalfeespaid, setTotalfeespaid] = useState(0);

  const [deleteID, setDeleteID] = useState('');
  const [count, setCount] = useState(1);

  const toggleShow = (fid) => {
    setCentredModal(!centredModal);
    setCount((prevCount) => prevCount + 1);
    setFid(fid);
    console.log('Fees receipt ID : ' + fid);
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
  const [isPrinting, setIsPrinting] = useState(false);
  const handlePrint = () => {
    window.print();
  };
  let fromDate = divprop?.fromDate ? new Date(divprop.fromDate) : null;
  let toDate = divprop?.toDate ? new Date(divprop.toDate) : null;

  const datta = display
    ?.filter((va) => {
      const divisionFilter = divprop?.divprop?.props
        ? va?.div_id?.d_name === divprop?.divprop?.props
        : true;

      if (fromDate && toDate) {
        let fdate = new Date(va?.f_date);
        let fromDateFilter = fdate >= fromDate;
        let toDateFilter = fdate <= toDate;
        return divisionFilter && fromDateFilter && toDateFilter;
      }
      return divisionFilter;
    })
    ?.map((item, index) => {
      console.log(item._id);
      return {
        serial: index + 1,

        student: item.std_id?.student_name,

        division: item?.div_id?.d_name,
        date: <Moment format="DD-MM-YYYY">{item?.f_date}</Moment>,
        fees: item.amount,

        actions: (
          <div>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <PreviewIcon
                  style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }}
                  onClick={() => toggleShow(item._id)}
                />
              </Grid>
              <Grid item>
                <Link count={count} setCentredModal={setCentredModal} to={`view/${item._id}`}>
                  <PrintIcon style={{ color: 'black', fontSize: '30px', cursor: 'pointer' }} />
                </Link>
              </Grid>
            </Grid>
          </div>
        )
      };
    });
  console.log('fees receipts', datta);

  const data = {
    columns: [
      {
        label: 'Sl No',
        field: 'serial',
        sort: 'asc',
        width: 150
      },

      {
        label: 'Student',
        field: 'student',
        sort: 'asc',
        width: 200
      },

      {
        label: 'Division',
        field: 'division',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Paid Date',
        field: 'date',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Amount Paid',
        field: 'fees',
        sort: 'asc',
        width: 50
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
  // Calculate total fees paid from datta
  useEffect(() => {
    const total = datta.reduce((total, item) => total + item.fees, 0);
    setTotalfeespaid(total);
  }, [datta]);

  console.log('total fees paid', totalfeespaid);

  return (
    <>
      <MDBDataTable striped data={data} />
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Fees Receipt</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => toggleClose()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {fid && <Fees_Reciept Fid={fid} count={count} setCentredModal={setCentredModal} />}
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
      <hr />
      <b>Total Fees Collected : {totalfeespaid}</b>
      <hr />
    </>
  );
}
