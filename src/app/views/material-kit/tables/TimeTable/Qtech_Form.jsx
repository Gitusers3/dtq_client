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


function Qtech_Form() {
    const nav = useNavigate();
    const [type, setType] = useState('');
    const [batch,setBatch]=useState([])
    const [timetable,setTimetable]=useState({})
    const [techie,setTechie]=useState([])
    const [session1,setSession1]=useState([])
    const [session2,setSession2]=useState([])
    const [session3,setSession3]=useState([])
    const [session4,setSession4]=useState([])
    const [selectedtechie,setSlectedtechie]=useState("")
    const [time,setTime]=useState({})
    useEffect(()=>{
      async function fetchadata(){
        const token=await localStorage.getItem("accessToken")
        url.get("staff/view",{headers:{"authToken":token}}).then((res)=>{
            
          const tech=res.data.filter((item)=>{
              return item.designation==="Software Developer"
          })
          setTechie(tech)
         



      }).catch((err)=>{
          alert(err)

      })



      }
      fetchadata()
       
    },[])



  
    const handleType = (e) => {
      setType(e.target.value);
    };

    const handletechie=(e)=>{
      setSlectedtechie(e.target.value)
  
    }
 
  
  
  
  const handleChange = (e) => {
    e.preventDefault();
    setTimetable({
        ...timetable,
        
        [e.target.name]:e.target.value
    })
    
   
  
  };
  console.log("timetable",timetable)
  const handleSession1 = (e) => {
    e.preventDefault();
   setSession1(e.target.value)
    
   
  
  };
 
  

  const handleSession2 = (e) => {
    e.preventDefault();
   setSession2(e.target.value)
    
   
  
  };
  const handleSession3 = (e) => {
    e.preventDefault();
   setSession3(e.target.value)
    
   
  
  };
  const handleSession4 = (e) => {
    e.preventDefault();
   setSession4(e.target.value)
  
    
   
  
  };




  
  
    useEffect(() => {
      if(selectedtechie){
      url
        .get(`batch/viewbatchtechie/${selectedtechie}`)
        .then((res) => {
          console.log("res",res.data);
          const filteredbatch=res.data.filter((item)=>{
            return item.d_id?.d_name==="QueueTech Solution"
      
          })
          console.log('filbatch',filteredbatch)
         
         
         
          setBatch(filteredbatch)
         
        })
        .catch((err) => {
          alert(err);
        });
      }
    }, [selectedtechie]);
   
   

 
  
    
   
   




    const handleSubmit = (event) => {
      event.preventDefault();
      setTime({
        ...timetable,
        tech_id:selectedtechie,
        first_session:session1,
        second_session:session2,
        third_session:session3,
        four_session:session4
    
    
      })
     

   
  
  
  
  
      url.post('techtimetable/insert',time).then((res)=>{
          console.log(res.data)
          alert(" Time Tables Details added Successfully")
    
      // nav("/staffs")
          
    
    
        }).catch((err)=>{
          alert(err)
    
        })
     
    };
  

  
  
  
  return (
    <div>
    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <h2 className="text-center">Time Table Qtech</h2>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }} >
         


          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="demo-simple-select-label">Choose Techie </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="tech_id"
              label="Choose Techie"
              value={selectedtechie}
             
              onChange={handletechie}
              required
            >
                {techie.map((item)=>(
                        <MenuItem value={item._id}>{item.staff_name}</MenuItem>

                ))}
          
           
            </Select>
          </FormControl>
        
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel id="demo-simple-select-label">Session 1</InputLabel>  
         
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="first_session"
              label="Session 1"
              value={session1}
              multiple
           
              onChange={handleSession1}
              required
            >

{batch.map((item) =>{ return (
      <MenuItem key={item._id} value={item._id}>
        {item.b_name}
      </MenuItem>
    ) })}
            
                  
           
             
            </Select>
            </FormControl>

            
          <FormControl fullWidth style={{ marginBottom: '20px' }}>

            <InputLabel id="demo-simple-select-label">Session 3 </InputLabel>
           
           <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               name="third_session"
               label="Session 3"
               value={session3}
               multiple
               onChange={handleSession3}
            
             >
 
 {batch.map((item) =>{ return (
       <MenuItem key={item._id} value={item._id}>
         {item.b_name}
       </MenuItem>
     ) })}
             
                   
            
              
             </Select>
             </FormControl>
             

       

       
        </Grid>
        

        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                
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
            

       

         
            <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Session 2</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="second_session"
        label="Session 2"
        multiple // Enable multiple selection
        value={session2} // Set the selected values to the state variable
        onChange={handleSession2}
      >
        {batch.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.b_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
          
          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel id="demo-simple-select-label">Session 4 </InputLabel>
           
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="four_session"
              label="Session 4"
              multiple
              value={session4}
          
              onChange={handleSession4}
            >

{batch.map((item) =>{ return (
      <MenuItem key={item._id} value={item._id}>
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

export default Qtech_Form