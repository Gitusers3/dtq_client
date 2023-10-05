import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import axios, { Axios } from 'axios';
import Swal from 'sweetalert2';

// import MockAdapter from 'axios-mock-adapter';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Subject } from '@mui/icons-material';
import { use } from 'echarts';
import url from '../../../../global';
import { useNavigate } from 'react-router-dom';

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const Staffform = () => {
  const nav = useNavigate();
  const [state, setState] = useState({ date: new Date() });

  const [role, setRole] = useState([]);

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [staff, setStaff] = useState({});
  const [staffdetails, setStaffdetails] = useState({});
  const [roleid, setRoleid] = useState('');
  const [designation, setDesignation] = useState('');

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handledesignation = (e) => {
    setDesignation(e.target.value);
  };

  const [contactNumberError, setContactNumberError] = useState(null);
  const [contactNumberError2, setContactNumberError2] = useState(null);
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    pan: '',
    aadhaar: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedValidationErrors = { ...validationErrors };

    if (name === 'pan_no') {
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      if (!panPattern.test(value)) {
        updatedValidationErrors.pan = 'Enter valid PAN example: ABCTY1234D';
      } else {
        updatedValidationErrors.pan = '';
      }
      setPanNumber(value);
    }

    if (name === 'adhar_no') {
      const formattedAadhaar = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      const aadhaarPattern = /^\d{4} \d{4} \d{4}$/;
      if (!aadhaarPattern.test(formattedAadhaar)) {
        updatedValidationErrors.aadhaar = 'Enter valid Aadhar Number';
      } else {
        updatedValidationErrors.aadhaar = '';
      }
      setAadhaarNumber(formattedAadhaar);
    }
    setValidationErrors(updatedValidationErrors);
    if (name === 'contact_no1') {
      if (value.length !== 10) {
        setContactNumberError('Contact number must contain exactly 10 digits');
      } else {
        setContactNumberError(''); // Reset the error message if validation passes
      }
    }
    if (name === 'contact_no2') {
      if (value.length !== 10) {
        setContactNumberError2('Contact number must contain exactly 10 digits');
      } else {
        setContactNumberError2(''); // Reset the error message if validation passes
      }
    }
    setStaff({
      ...staff,
      status: 'active',
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    url
      .get('http://localhost:4000/api/role/view')
      .then((res) => {
        console.log(res.data);
        setRole(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  console.log('designation', designation);
  const [selectedimage, setSelectedImage] = useState(null);
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  console.log(selectedimage);

  const handleSubmit = (event) => {
    const Data = new FormData();
    Data.append('image', selectedimage);
    for (let x in staff) {
      Data.append(x, staff[x]);
    }
    axios
      .post('http://localhost:4000/api/staff/insert', Data)
      .then((res) => {
        console.log(res.data);
        alert('Staff Details added Successfully');
        let timerInterval;
        Swal.fire({
          title: 'Staff Details inserted Successfully',
          html: 'You are redirecting to Staff table in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Staff Inserted successfully');
            nav('/staffs');
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  console.log('sdfr', staffdetails);
  console.log('staff', staff);

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,

    date,
    email
  } = state;

  const [disc, setDisc] = useState([]);
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      college: '',
      address: ''
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    college: '',
    address: ''
  });
  const [staffs, setStaffs] = useState([]);
  const [employee_code, setEmployee_code] = useState('EMPDQ101');

  useEffect(() => {
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      url
        .get('staff/view', { headers: { authToken: token } })
        .then((res) => {
          console.log('staffs', res.data);
          setStaffs(res.data);
          const lastRecord = res.data[res.data.length - 1];
          const lastEmpcode = lastRecord ? lastRecord.employee_code : 'EMPDQ';
          const newEmpCode = generateNextEmpCode(lastEmpcode);
          setEmployee_code(newEmpCode);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();
  }, []); // Run the effect once, when the component mounts

  function generateNextEmpCode(lastEmpCode) {
    const lastCounter = parseInt(lastEmpCode.match(/\d+/)[0]);
    const newCounter = lastCounter + 1;
    return `EMPDQ${newCounter}`;
  }

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} enctype="multipart/form-data">
        <h2 className="text-center">Staff Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <small>Employee code : {employee_code}</small>
            <TextField
              type="text"
              name="employee_code"
              id="standard-basic"
              // placeholder={employee_code}
              onChange={handleChange}
              label="Employee Code"
              required
            />
            <TextField
              type="text"
              name="staff_name"
              id="standard-basic"
              onChange={handleChange}
              label="Employee Name "
              required
            />
            <small>Profile Picture</small>
            <TextField
              required
              type="file"
              name="profile"
              id="standard-basic"
              onChange={handleFileChange}
            />
            <InputLabel id="demo-simple-select-label">Date Of Joining </InputLabel>
            <TextField required type="date" name="doj" label="" onChange={handleChange} />
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Choose Employee Type </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_type"
                label="Choose Employee type"
                onChange={handleChange}
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee Category </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="employee_category"
                label="Employee Category"
                onChange={handleChange}
              >
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Temporary">Temporary</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Employee Role </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Employee Role"
                name="role_id"
                onChange={handleChange}
              >
                {role.map((item) => {
                  return <MenuItem value={item._id}>{item.role}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {/* <TextField
              type="text"
              name="username"
              id="standard-basic"
              onChange={handleChange}
      
              label="Username (Min length 4, Max length 9)"
            
            /> */}
            {/* <TextField
              sx={{ marginTop: '10px' }}
              type="email"
              name="email"
              label="Email"
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            /> */}
            {/* <InputLabel id="demo-simple-select-label">Employee Profile Image</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="file"
              name="profile_img"
              label=""
              onChange={handleChange}
      
             
            /> */}
            {/* <TextField
              sx={{ mb: 4 }}
              type="text"
              name="creditCard"
              label="Place"
              onChange={handleChange}
      
             
            /> */}
            <FormControl fullWidth style={{ marginTop: '20px', marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Employee Designation </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="designation"
                label="Employee designation"
                onChange={handleChange}
              >
                <MenuItem value="Administartor">Administartor</MenuItem>
                <MenuItem value="HR">HR </MenuItem>
                <MenuItem value="Software Developer">Software Developer </MenuItem>
                <MenuItem value="Marketing Executive">Marketing Executive </MenuItem>
                <MenuItem value="Accountant">Accountant </MenuItem>
              </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Gardian Name</InputLabel>
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="gname"
              label="Gardian Name"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="relationship"
              label="Relationship"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="tel"
              name="gcontact"
              label="Gaurdian Conatct"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="taddress"
              label="Contact Address"
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="paddress"
              label="Address"
              required
              onChange={handleChange}
            />
            <TextField
              type="number"
              required
              name="contact_no1"
              error={contactNumberError !== ''}
              helperText={contactNumberError}
              label="Contact Nubmer1( whatsapp )"
              onChange={handleChange}
            />
            <TextField
              type="number"
              name="contact_no2"
              label="Contact Nubmer2"
              error={contactNumberError2 !== ''}
              helperText={contactNumberError2}
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 4 }}
              type="email"
              name="email"
              label="Email"
              required
              onChange={handleChange}
            />
            <TextField sx={{ mb: 4 }} type="date" name="dob" label="DOB" onChange={handleChange} />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="blood_group" label="Bood Group" onChange={handleChange} />
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Choose Gender </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="gender"
                label="Choose Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="marital_status"
              type="text"
              label="Marital Status"
              onChange={handleChange}
            />
            <TextField
              type="text"
              required
              name="pan_no"
              value={panNumber}
              onChange={handleChange}
              label="Pan Number"
            />
            {validationErrors.pan && <p style={{ color: 'red' }}>{validationErrors.pan}</p>}
            <TextField
              type="text"
              required
              name="adhar_no"
              onChange={handleChange}
              value={aadhaarNumber}
              label="Adhar Number"
            />
            {validationErrors.aadhaar && <p style={{ color: 'red' }}>{validationErrors.aadhaar}</p>}

            {/* <RadioGroup
              row
              name="gender"
              sx={{ mb: 2 }}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                label="Male"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>

            <FormControlLabel
              control={<Checkbox />}
              label="I have read and agree to the terms of service."
            /> */}
          </Grid>
        </Grid>

        {/* project details for queuetech */}

        {/* internship details for cognitive */}

        {/* internship details for codeLab */}

        <Button fullWidth color="primary" variant="contained" type="submit">
          {/* <Icon>send</Icon> */}
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

const top100Films = [{ college: 'The Shawshank Redemption', address: 1994 }];

export default Staffform;
