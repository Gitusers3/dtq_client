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

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

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
  const [college, setCollege] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [batch, setBatch] = useState('');
  const [finalBatch, setFinalBatch] = useState({});
  const [techie, setTechie] = useState([]);
  const [status, setStatus] = useState('Assigned');
  const [selectedTechie, setSelectedTechie] = useState([]);
  const [project,setProject]=useState([])
  const [selectedProject, setSelectedProject] = useState([]);


  useEffect(() => {
    async function fetchadata(){
      const token=await localStorage.getItem("accessToken")
      url
      .get('http://localhost:4000/api/college/view',{headers:{"authToken":token}})
      .then((res) => {
        console.log(res.data);
        setCollege(res.data);
      })
      .catch((err) => {
        alert(err);
      });
      url
      .get('http://localhost:4000/api/student/view_project',{headers:{"authToken":token}})
      .then((res) => {
        console.log("coll",res.data);

        setProject(res.data);
       
      })
      .catch((err) => {
        alert(err);
      });


    }
    fetchadata()
    
  }, [selectedCollege]);

 const filteredproject=project.filter((item)=>{
    return item.college_id===selectedCollege;
  })


  console.log("filterproject",filteredproject)

  const handleSelectChangeofCollege = (event) => {
    setSelectedCollege(event.target.value);
    console.log(selectedCollege + ' college');
  };
 

  useEffect(() => {
    // Make the API request
    async function fetchdata(){
      const token=await localStorage.getItem("accessToken")
      axios
      .get('http://localhost:4000/api/staff/view',{headers:{"authToken":token}})
      .then((res) => {
        console.log(res.data);
        setTechie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    }
    fetchdata()
  
    // alert(selectedDivision);
  }, [selectedTechie]);
  console.log(selectedTechie + ' Techies');

  const filteredTechie = techie.filter((t) => t.designation === 'Software Developer');

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
    console.log(selectedTechiesWithNames); // Selected techies with names and IDs
  };


  
  const handleChange2 = (event) => {
    const {
      target: { value }
    } = event;
    const selectedProjectsWithNames = value.map((id) => {
      const pro = filteredproject.find((pro) => pro._id === id);
      return pro ? { _id: pro._id, project_title: pro.project_title } : null;
    });

    setSelectedProject(selectedProjectsWithNames);
    console.log(selectedProjectsWithNames); // Selected techies with names and IDs
  };

  console.log("selectedpro",selectedProject)



  const handleSubmit = (event) => {
    event.preventDefault();
    const a = {
      batch,
      d_id:'64b63281e4c71dfecf988dda',
      c_id: selectedCollege,
      tech_id: selectedTechie,
      project_id:selectedProject,
      status: status
    };
    console.log(a);
    axios
      .post('http://localhost:4000/api/batch/insert', a)
      .then((res) => {
        console.log(res.data);
        alert('Batch created Successfully');
        // nav("/staffs")
      })
      .catch((err) => {
        alert(err);
      });
  };

  // console.log('sdfr', staffdetails);
  // console.log('staff', staff);

  const handleChange = (event) => {
    event.persist();
    setBatch(event.target.value);
    console.log(batch);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}>
        <h2 className="text-center">Batch Details</h2>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="b_name"
              id="standard-basic"
              onChange={handleChange}
              label="Batch Name"
              required
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Choose Collge</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Division"
                value={selectedCollege}
                onChange={handleSelectChangeofCollege.bind(this)}
                required
              >
                {college.map((t) => (
                  <MenuItem key={t._id} value={t._id}>
                    {t.c_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose Techie"
                value={selectedTechie}
                onChange={handleSelectChangeofTechie.bind(this)}
              >
                {filteredTechie.map((t) => (
                  <MenuItem key={t._id} value={t._id}>
                    {t.staff_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedTechie?.map((tech) => tech._id)} // Pass an array of IDs to the Select component
                onChange={handleChange1}
                input={<OutlinedInput id="select-multiple-chip" label="Choose Techie" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedTechie?.map((tech) => (
                      <Chip key={tech._id} label={tech.staff_name} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                required
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

            <FormControl fullWidth sx={{ mt:4  }}>
              <InputLabel id="demo-simple-select-label">Choose Project</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedProject?.map((pro) => pro._id)} // Pass an array of IDs to the Select component
                onChange={handleChange2}
                input={<OutlinedInput id="select-multiple-chip" label="Choose Project" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedProject?.map((pro) => (
                      <Chip key={pro._id} label={pro.project_title} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                required
              >
                {filteredproject.map((name) => (
                  <MenuItem
                    key={name._id}
                    value={name._id}
                    label={name.project_title}
                    style={getStyles(
                      name,
                      selectedProject?.map((pro) => pro._id),
                      theme
                    )} // Pass an array of IDs to getStyles
                  >
                    {name.project_title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button fullWidth color="primary" variant="contained" type="submit" sx={{ mt: '20px' }}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Staffform;
