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
  console.log(divprop.clg, 444444444);
  useEffect(() => {
    async function fetchdata() {
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
    fetchdata();
  }, [divprop.clg]);
  console.log(display);
  const [centredModal, setCentredModal] = useState(false);
  const [sid, setSid] = useState();

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
      return va?.all_status === 'Completed';
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
                <Link to={`/student/students/view/${item._id}`}>
                  <RemoveRedEyeIcon />
                </Link>
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
    </>
  );
};

export default DatatablePage;
