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
import axios, { Axios } from 'axios';
import Time from './time';
import DeleteIcon from '@mui/icons-material/Delete';
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
import url from 'global';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const filter = createFilterOptions();
// const mock = new MockAdapter(axios);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(name, selectedTechie, theme) {
  return {
    fontWeight:
      selectedTechie.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const Staffform = () => {
  const theme = useTheme();

  const nav = useNavigate();
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [batch, setBatch] = useState('');
  const [finalBatch, setFinalBatch] = useState({});
  const [techie, setTechie] = useState([]);
  const [status, setStatus] = useState('Assigned');
  const [selectedTechie, setSelectedTechie] = useState([]);
  const [snackopen, setSnackOpen] = useState(false);

  const handleSnackClick = () => {
    setSnackOpen(true);
    return;
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      url
        .get('http://localhost:4000/api/division/view_division', { headers: { authToken: token } })
        .then((res) => {
          // console.log(res.data);
          setDivision(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
    FetchData();
  }, [selectedDivision]);
  const filteredDivision = division?.filter(
    (t) => t.d_name === 'Cognitive Solution' || t.d_name === 'CodeLab Systems'
  );

  useEffect(() => {
    // Make the API request
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      axios
        .get('http://localhost:4000/api/staff/view', { headers: { authToken: token } })
        .then((res) => {
          // console.log(res.data);
          setTechie(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    fetchdata();

    // alert(selectedDivision);
  }, [selectedTechie]);

  const filteredTechie = techie?.filter(
    (t) => t.designation === 'Software Developer' && t.status == 'active'
  );
  const [selectedDays, setSelectedDays] = useState('');
  const [selectedFromTime, setSelectedFromTime] = useState('');
  const [selectedToTime, setSelectedToTime] = useState('');
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const initialRow = {
    id: 1,
    day: selectedDays,
    from_time: selectedFromTime, // Default value for "from_time"
    to_time: selectedToTime // Default value for "to_time"
  };

  const [formData, setFormData] = useState({
    b_name: '',
    timings: [initialRow],
    d_id: '',
    tech_id: '',
    status: 'Ongoing'
  });

  const handleSelectChangeofDivision = (event) => {
    setSelectedDivision(event.target.value);
    setFormData({ ...formData, d_id: event.target.value });
    console.log(selectedDivision + ' Division ID');
  };

  const handleChangeofDays = (index, field, value) => {
    // console.log(value);
    const updatedTimings = formData.timings.map((row, i) => {
      if (i === index) {
        if (field == 'from_time') {
          const updatedFromTime = value?.$d;
          // Convert the updated time values to the desired format using moment
          const formattedFromTime = moment(updatedFromTime).format('HH:mm:ss');
          return { ...row, from_time: formattedFromTime };
        } else if (field == 'to_time') {
          const updatedToTime = value?.$d;
          // Convert the updated time values to the desired format using moment
          const formattedToTime = moment(updatedToTime).format('HH:mm:ss');
          return { ...row, to_time: formattedToTime };
        } else {
          setSelectedDays(value);
          return {
            ...row,
            [field]: value
          };
        }
      }
      return row;
    });
    setFormData({
      ...formData,
      timings: updatedTimings
    });

    // Extract the specific from_time and to_time values
  };
  // console.log(selectedFromTime);
  const handleDeleteRow = (index) => {
    const updatedRows = formData.timings?.filter((row, i) => i !== index);
    setFormData({
      ...formData,
      timings: updatedRows
    });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      timings: [...formData.timings, { ...initialRow, id: formData.timings.length + 1 }]
    });
  };

  const handleChange = (event) => {
    event.persist();
    setFormData({ ...formData, b_name: event.target.value });
    // console.log(formData, 123);
  };

  const handleChange1 = (event) => {
    const {
      target: { value }
    } = event;

    // Get the selected techies as an array of objects with _id and staff_name properties
    const selectedTechiesWithNames = value.map((id) => {
      const staff = filteredTechie.find((tech) => tech._id === id);
      return staff ? { _id: staff._id, staff_name: staff.staff_name } : null;
    });

    setSelectedTechie(selectedTechiesWithNames);
    setFormData({ ...formData, tech_id: event.target.value });
    // console.log(selectedTechiesWithNames); // Selected techies with names and IDs
  };

  const handleSubmit = (event) => {
    console.log(formData);
    const finalBatch = { ...formData, class_id: value._id };

    event.preventDefault();
    // const a = {
    //   batch,
    //   d_id: selectedDivision,
    //   tech_id: selectedTechie,
    //   status: status
    // };
    // // console.log(a);
    axios
      .post('http://localhost:4000/api/batch/insert', finalBatch)
      .then((res) => {
        console.log(res.data);
        // handleSnackClick();
        setSnackOpen(true);
        nav('/batches');
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [disc, setDisc] = useState([]);
  const [collegeNameError, setCollegeNameError] = useState(null); // State to store validation error

  const [selectedClassRoom, setSelectedClassRoom] = useState('');
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [count, setCount] = useState(1);

  const handleClose = () => {
    setDialogValue({
      class: ''
    });
    toggleOpen(false);
  };
  const [dialogValue, setDialogValue] = useState({
    class: ''
  });

  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      axios
        .get('http://localhost:4000/api/classRoom/view', { headers: { authToken: token } })
        .then((res) => {
          setDisc(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    FetchData();
  }, [count]);

  // console.log(selectedClassRoom);
  // console.log(disc, 1111111);

  const [classRoom, setClassRoom] = useState('');
  const handleSubmitDialog = (event) => {
    event.preventDefault();

    const cls_name = dialogValue.class;

    // Check if either college name or address is empty
    if (cls_name.trim() === '') {
      setCollegeNameError('Class room name is required!');
      return;
    }

    // Check if the college name is already in the list
    if (disc.some((item) => item?.cls_name === cls_name)) {
      setCollegeNameError('Class room already exists!!!');
      return; // Exit early if there's an error
    }

    // Reset the error state if validation passes
    setCollegeNameError('');

    axios
      .post('http://localhost:4000/api/classRoom/insert', { cls_name })
      .then((res) => {
        // console.log('Inserted:', res);
        if (res.data.success) {
          alert('Insertion Successful');
          // console.log('Insertion Successful');
          setCount((prevCount) => prevCount + 1);
          handleClose();
        }
      })
      .catch((err) => {
        alert(err);
        // console.log('Error frontend:', err);
      });
  };

  return (
    <div>
      <div>
        <Snackbar
          open={snackopen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          action={action}
        >
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            Batch created successfully
          </Alert>
        </Snackbar>
      </div>
      <ValidatorForm onSubmit={handleSubmit}>
        <h2 className="text-center">Batch Details</h2>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="b_name"
              id="standard-basic"
              onChange={handleChange}
              label="Batch Name"
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                value={selectedDivision}
                onChange={handleSelectChangeofDivision.bind(this)}
                required
              >
                {filteredDivision.map((t) => (
                  <MenuItem key={t._id} value={t._id}>
                    {t.d_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedTechie?.map((tech) => tech._id)} // Pass an array of IDs to the Select component
                onChange={handleChange1}
                required
                input={<OutlinedInput id="select-multiple-chip" label="Choose Techie" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedTechie?.map((tech) => (
                      <Chip key={tech._id} label={tech.staff_name} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {filteredTechie.map((name) => (
                  <MenuItem
                    key={name._id}
                    value={name._id}
                    label={name.staff_name}
                    style={getStyles(
                      name,
                      selectedTechie?.map((tech) => tech._id),
                      theme
                    )} // Pass an array of IDs to getStyles
                  >
                    {name.staff_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              required
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  // Timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue({
                      class: newValue
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  setDialogValue({
                    class: newValue.inputValue
                  });
                } else {
                  setValue(newValue);
                  // Set the selected college to selectedClassRooClassRoom here
                  setSelectedClassRoom(newValue ? newValue._id : '');
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                  filtered.push({
                    inputValue: params.inputValue,
                    cls_name: `Add "${params.inputValue}"`
                  });
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={disc}
              getOptionLabel={(option) => {
                // e.g., value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.cls_name;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                return (
                  <>
                    <li {...props}>{option.cls_name}</li>
                  </>
                );
              }}
              freeSolo
              renderInput={(params) => <TextField {...params} label="Choose Class room" />}
            />

            <Dialog open={open} onClose={handleClose}>
              {/* <form> */}
              <DialogTitle>Add new Class room</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Did you miss any Class room in our list? Please, add it!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.class}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      class: event.target.value
                    })
                  }
                  label="Class room number"
                  type="text"
                  variant="standard"
                  error={collegeNameError !== null} // Apply error state based on validation
                  helperText={collegeNameError} // Display error message if it exists
                />

                {/* Add your submit button here */}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitDialog} type="submit">
                  Add
                </Button>
              </DialogActions>
              {/* </form> */}
            </Dialog>
          </Grid>
        </Grid>
        {formData?.timings?.map((row, index) => (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            key={row.id} // Added key to avoid React warnings
          >
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="demo-simple-select-label">Choose Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="day"
                  value={row.day}
                  onChange={(e) => handleChangeofDays(index, 'day', e.target.value)}
                  input={<OutlinedInput label="Choose Day" />}
                  renderValue={(selected) => selected} // Display the selected day directly
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'TimePicker',
                    'MobileTimePicker',
                    'DesktopTimePicker',
                    'StaticTimePicker'
                  ]}
                >
                  <MobileTimePicker
                    name="from_time"
                    value={row.from_time}
                    onChange={(newValue) => handleChangeofDays(index, 'from_time', newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <div className="d-flex">
                <div className="w-100">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        'TimePicker',
                        'MobileTimePicker',
                        'DesktopTimePicker',
                        'StaticTimePicker'
                      ]}
                    >
                      <MobileTimePicker
                        name="to_time"
                        value={row.to_time}
                        onChange={(newValue) => handleChangeofDays(index, 'to_time', newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <DeleteIcon
                    variant="outlined"
                    onClick={() => handleDeleteRow(index)}
                    color="error"
                    sx={{ cursor: 'pointer', mt: 3 }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        ))}
        <Button sx={{ mt: 1 }} variant="contained" color="primary" onClick={handleAddRow}>
          Add More
        </Button>
        <Button fullWidth color="primary" variant="contained" type="submit" sx={{ mt: '20px' }}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Staffform;
