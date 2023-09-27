import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material/styles'; // Import from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'; // Import from '@mui/material/styles'
import { Icon, Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Breadcrumb, SimpleCard } from 'app/components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SimpleForm from '../material-kit/forms/SimpleForm';
import StepperForm from '../material-kit/forms/StepperForm';
import Sidenav from '../../components/Sidenav';
import AreaChart from '../charts/echarts/AreaChart';
import ComparisonChart from '../charts/echarts/ComparisonChart';
import DoughnutChart from '../charts/echarts/Doughnut';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
const GreenRadio = styled(Radio)(({ theme }) => ({
  color: green[400],
  '&.Mui-checked': {
    color: green[600]
  }
}));
const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  color: green[400],
  '&$checked': { color: green[600] }
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));

export default function FeesDetails({ studentD, setStudent, paidFees }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#dcc715' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  const IconList = ['edit'];
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const [on, setOn] = useState(true);
  const [pending, setPending] = useState(0);
  console.log(studentD.pending_fees + 'pending from props 123');
  useEffect(() => {
    const a = studentD.pending_fees;
    setPending(a);
  }, [pending]);
  console.log(pending + ' pending fees in fees dvhjfjfg');

  const theme = useTheme();
  let param = useParams();
  console.log('Id in Fees details : ' + param.id);

  // Rest of your component code...

  const [sts, setSts] = useState('');

  const [feealert, setFeealert] = useState(false);

  const [state1, setState1] = useState({
    checkedA1: false,
    checkedB1: false,
    checkedD1: false
  });

  const handleChange1 = (name) => (event) => {
    setFeealert(false);
    if (name === 'Ongoing') {
      setState1({
        checkedA1: true,
        checkedB1: false,
        checkedD1: false
      });
      setSts(name);
      Axios.put(`http://localhost:4000/api/student/update/${param.id}`, {
        sts: name
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // Handle successful update if needed
          }
        })
        .catch((err) => {
          alert('Error!');
          console.log(err);
        });
    } else if (name === 'Completed') {
      if (studentD.pending_fees != 0) {
        // alert("You can't change status if his/her fees is pending");
        setFeealert((prevState) => !prevState);
      } else {
        setState1({
          checkedA1: false,
          checkedB1: true,
          checkedD1: false
        });
        setSts(name);
        Axios.put(`http://localhost:4000/api/student/update/${param.id}`, {
          sts: name
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              // Handle successful update if needed
            }
          })
          .catch((err) => {
            alert('Error!');
            console.log(err);
          });
      }
    } else if (name === 'Discontinued') {
      setState1({
        checkedA1: false,
        checkedB1: false,
        checkedD1: true
      });
      setSts(name);
      Axios.put(`http://localhost:4000/api/student/update/${param.id}`, {
        sts: name
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // Handle successful update if needed
          }
        })
        .catch((err) => {
          alert('Error!');
          console.log(err);
        });
    }
    console.log(name);

    // Trigger the API call here based on the selected radio button
  };

  useEffect(() => {
    // Update the state based on studentD?.all_status
    if (studentD?.all_status === 'Ongoing') {
      setState1({
        checkedA1: true,
        checkedB1: false,
        checkedD1: false
      });
    } else if (studentD?.all_status === 'Completed') {
      setState1({
        checkedA1: false,
        checkedB1: true,
        checkedD1: false
      });
    } else if (studentD?.all_status === 'Discontinued') {
      setState1({
        checkedA1: false,
        checkedB1: false,
        checkedD1: true
      });
    }
  }, [studentD?.all_status]);
  console.log(studentD?.all_status);

  const chartColors = [
    '#E64848',
    '#8EAC50',
    theme.palette.primary.light
    // Add more colors here if needed
  ];
  return (
    <div>
      <div>
        <Item>
          <h6 className="text-start text-black fw-bolder">Fees</h6>
        </Item>

        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Total Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span>{studentD?.fees}/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Paid Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span className="fw-bolder text-success">{paidFees}/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Pending Fees
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <span className="text-danger fw-bolder">{studentD?.pending_fees}/-</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <SimpleCard>
          <DoughnutChart
            paidFees={paidFees}
            pending={studentD?.pending_fees}
            height="300px"
            color={chartColors}
          />
        </SimpleCard>

        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '14px', textTransform: 'uppercase' }}
                  >
                    Student Status
                  </TableCell>
                </TableRow>
                {/* <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state1.checkedA}
                          onChange={handleChange('checkedA')}
                          value="checkedA"
                        />
                      }
                      label="On Going"
                    />
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state.checkedB}
                          onChange={handleChange('checkedB')}
                          value="checkedB"
                        />
                      }
                      label="Completed"
                    />
                  </TableCell>
                </TableRow>
                {/* Add more rows for other checkboxes */}
                {/* <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          color="default"
                          checked={state.checkedD}
                          onChange={handleChange('checkedD')}
                          value="checkedD"
                        />
                      }
                      label="Discontinued"
                    />
                  </TableCell>
                </TableRow>{' '} */}

                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-start"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    <RadioGroup
                      row
                      sx={{ display: 'flex', flexDirection: 'column' }}
                      aria-label="student-status"
                      name="student-status"
                      value={
                        state1.checkedA1
                          ? 'Ongoing'
                          : state1.checkedB1
                          ? 'Completed'
                          : 'Discontinued'
                      }
                      onChange={(event) => handleChange1(event.target.value)()}
                    >
                      <FormControlLabel
                        value="Ongoing"
                        control={<Radio color="primary" />}
                        label="On Going"
                        checked={state1.checkedA1}
                      />
                      <FormControlLabel
                        value="Completed"
                        control={<Radio color="primary" />}
                        label="Completed"
                        checked={state1.checkedB1}
                      />
                      {feealert && (
                        <p style={{ color: 'red', fontSize: '14px' }}>
                          You can't change status if his/her fees is pending !!!
                        </p>
                      )}
                      <FormControlLabel
                        value="Discontinued"
                        control={<Radio color="primary" />}
                        label="Discontinued"
                        checked={state1.checkedD1}
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
