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


const filter = createFilterOptions();
// const mock = new MockAdapter(axios);

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

function Code_Form() {
    const nav = useNavigate();

  
  
    const [type, setType] = useState('');

    const [batch,setBatch]=useState([])
   
  
     
    const [timetable,setTimetable]=useState({})

  
    const handleType = (e) => {
      setType(e.target.value);
    };
  
  
  
  const handleChange = (e) => {
    e.preventDefault();
    setTimetable({
        ...timetable,
        [e.target.name]:e.target.value
    })
    
   
  
  };

  console.log("timetable",timetable)



  
  
    useEffect(() => {
      url
        .get('batch/view')
        .then((res) => {
          console.log("res",res.data);
          setBatch(res.data)
         
        })
        .catch((err) => {
          alert(err);
        });
    }, []);
    console.log('batch',batch)
    const filterBatch=batch.filter((item)=>{
        return item.d_id?.d_name==="CodeLab Systems"

    })

    console.log("filterBatch",filterBatch)
    console.log("filterBatch name",filterBatch)
   
   




    const handleSubmit = (event) => {
      event.preventDefault();

   
  
  
  
  
      url.post('cltimetable/insert',timetable).then((res)=>{
          console.log(res.data)
          alert(" Time Tables Details added Successfully")
    
    //   nav("/staffs")
          
    
    
        }).catch((err)=>{
          alert(err)
    
        })
     
    };
  

  
  
  
  return (
    <div>
    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <h2 className="text-center">Time Table CodeLab</h2>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }} >
         


          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="demo-simple-select-label">Choose Day </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="dayofweek"
              label="Choose Day"
             
              onChange={handleChange}
              required
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
          </FormControl>
        
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel id="demo-simple-select-label">Session 2</InputLabel>  
         
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="second_session"
              label="Session 2"
           
              onChange={handleChange}
              required
            >

{filterBatch.map((item) =>{ return (
      <MenuItem key={item._id} value={item.b_name}>
        {item.b_name}
      </MenuItem>
    ) })}
            
                  
           
             
            </Select>
            </FormControl>

       

       
        </Grid>
        

        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel id="demo-simple-select-label">Session 1</InputLabel>  
         
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="first_session"
              label="Session 1"
           
              onChange={handleChange}
              required
            >

{filterBatch.map((item) =>{ return (
      <MenuItem key={item._id} value={item.b_name}>
        {item.b_name}
      </MenuItem>
    ) })}
            
                  
           
             
            </Select>
            </FormControl>
            

       

         
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Session 3 </InputLabel>
           
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="third_session"
              label="Session 3"
          
              onChange={handleChange}
              required
            >

{filterBatch.map((item) =>{ return (
      <MenuItem key={item._id} value={item.b_name}>
        {item.b_name}
      </MenuItem>
    ) })}
            
                  
           
             
            </Select>
          </FormControl>
      
        
        
        
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
  )
}

export default Code_Form