import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Icon, selectClasses } from '@mui/material';
import { IconButton } from '@mui/material';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import url from 'global';
import EditIcon from '@mui/icons-material/Edit';
import { initial } from 'lodash';
import { Button, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, styled } from '@mui/material';

import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Subject } from '@mui/icons-material';
import { use } from 'echarts';
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
import DeleteIcon from '@mui/icons-material/Delete';

import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Batchview({ batch, SetBatchChange }) {
  console.log(batch);
  const [open, setOpen] = React.useState(false);
  const [initialBatch, setInitialBatch] = useState(batch);

  const [batchTimings, setBatchTimings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedtechie, setSelectedtechie] = useState([]);
  const [batchname, setBatchname] = useState();
  const [bstatus, setBstatus] = useState();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      url
        .get('classRoom/view', { headers: { authToken: token } })
        .then((res) => {
          setClasses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, []);

  useEffect(() => {
    url.get(`batch/viewbatch/${batch._id}`).then((res) => {
      setSelectedtechie(res.data?.tech_id);
      setSelectedClass(res.data?.class_id._id);
      setBatchname(res.data?.b_name);
      setBstatus(res.data?.status);
      setBatchTimings(res.data?.timings);
    });
  }, []);
  console.log(selectedtechie);
  console.log(initialBatch);
  useEffect(() => {
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      url
        .get('staff/view', { headers: { authToken: token } })
        .then((res) => {
          const staff = res.data.filter((item) => {
            return item.designation === 'Software Developer';
          });
          setStaff(staff);
        })
        .catch((err) => {
          alert(err);
        });
    }
    fetchdata();
  }, []);

  const handleSelectChangeofClass = (e) => {
    setSelectedClass(e.target.value);
  };
  console.log(selectedClass);

  const handleSelectChangeofTechie = (e) => {
    setSelectedtechie(e.target.value);
    // setInitialBatch({ ...initialBatch, [initialBatch.tech_id]: selectedtechie });
  };
  console.log(selectedtechie);
  const handleBatch = (e) => {
    setInitialBatch({ ...initialBatch, [e.target.name]: e.target.value });
  };

  const handleStatus = (e) => {
    setBstatus(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(batch?.timings);

  const [selectedDays, setSelectedDays] = useState('');
  const [selectedFromTime, setSelectedFromTime] = useState('');
  const [selectedToTime, setSelectedToTime] = useState('');
  const [times, setTimes] = useState(false);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const initialRow = {
    id: 1,
    day: selectedDays,
    from_time: selectedFromTime, // Default value for "from_time"
    to_time: selectedToTime // Default value for "to_time"
  };

  const [formData, setFormData] = useState({
    timings: [initialRow],
    tech_id: selectedtechie,
    class_id: selectedClass,
    ...initialBatch
  });

  const handleChangeofDays = (index, field, value) => {
    console.log(value);
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
  const handleTimes = () => {
    setTimes((prev) => !prev);
  };

  const handleSave = async () => {
    const updatedTimings = { ...formData };
    // Check if timings have been modified
    const timingsModified = updatedTimings.timings.some(
      (row, index) =>
        row.day !== initialRow.day ||
        row.from_time !== initialRow.from_time ||
        row.to_time !== initialRow.to_time
    );

    // If timings have not been modified, set timings to the initial timings
    if (!timingsModified) {
      updatedTimings.timings = [initialRow];
    }
    const updatedBatch = {
      ...initialBatch,
      timings: [...updatedTimings.timings],
      tech_id: selectedtechie,
      class_id: selectedClass
    };
    console.log(updatedBatch);
    url
      .put(`batch/update/${batch._id}`, updatedBatch)
      .then((res) => {
        if (res.status == 200) {
          SetBatchChange((prev) => !prev);
          console.log(res.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
    await setOpen(false);
  };
  return (
    <div>
      <Tooltip arrow title="Edit Batch">
        <IconButton>
          <EditIcon onClick={handleClickOpen} color="primary">
            Edit
          </EditIcon>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{'Batch Details'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-basic"
              value={initialBatch?.b_name}
              variant="standard"
              name="b_name"
              onChange={handleBatch}
              fullWidth
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                // disabled={ton}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Techie"
                value={selectedtechie}
                onChange={handleSelectChangeofTechie}
                multiple
              >
                {staff.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.staff_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Class Room</InputLabel>
              <Select
                // disabled={ton}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Class Room"
                name="cls_name"
                value={selectedClass}
                onChange={handleSelectChangeofClass}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.cls_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              {formData?.timings?.map((row, index) => (
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  key={row.id} // Added key to avoid React warnings
                >
                  <Grid item xs={times === false ? 4 : 3}>
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
                  <Grid item xs={times === false ? 4 : 3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          'TimePicker',
                          'MobileTimePicker',
                          'DesktopTimePicker',
                          'StaticTimePicker'
                        ]}
                      >
                        {times === false ? (
                          <TextField
                            id="standard-basic"
                            value={row.from_time}
                            variant="outlined"
                            name="from_time"
                            onClick={handleTimes}
                            fullWidth
                          />
                        ) : (
                          <MobileTimePicker
                            name="from_time"
                            value={row.from_time}
                            onChange={(newValue) =>
                              handleChangeofDays(index, 'from_time', newValue)
                            }
                          />
                        )}
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  {times === true ? (
                    <Grid item xs={2} sx={{ justifyContent: 'center', display: 'flex' }}>
                      <button onClick={handleTimes} className="btn btn-danger mt-3 p-1">
                        Return
                      </button>
                    </Grid>
                  ) : (
                    ''
                  )}
                  <Grid item xs={times === false ? 4 : 3}>
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
                            {times === false ? (
                              <TextField
                                id="standard-basic"
                                value={row.to_time}
                                variant="outlined"
                                name="to_time"
                                onClick={handleTimes}
                                fullWidth
                              />
                            ) : (
                              <MobileTimePicker
                                name="to_time"
                                value={row.to_time}
                                onChange={(newValue) =>
                                  handleChangeofDays(index, 'to_time', newValue)
                                }
                              />
                            )}
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
            </div>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>

              <Select
                // disabled={ton}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                value={initialBatch?.status}
                name="status"
                onChange={handleBatch}
              >
                <MenuItem key="Ongoing" value="Ongoing">
                  Ongoing
                </MenuItem>

                <MenuItem key="Completed" value="Completed">
                  Completed
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'red' }}>
            Close
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Batchview;
