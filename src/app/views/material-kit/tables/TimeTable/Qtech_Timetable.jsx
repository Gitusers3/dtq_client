import { Box, styled,Grid } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import SimpleDialogDemo from './SimpleDialog';



import QtechSimpletable from './QtechSimpletable';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import url from 'global';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function Qtech_Timetable() {
  const [techie,setTechie]=useState([])
  const [techid,setTechid]=useState("")
  const [selctedTechie,setSelectedtecchi]=useState("")

  useEffect(()=>{
    async function fetchdata(){
      const token=await localStorage.getItem("accessToken")
      url.get('staff/view',{headers:{"authToken":token}}).then((res)=>{
        console.log("staff",res.data)
        const staff=res.data.filter((item)=>{
          return item.designation==="Software Developer"
  
        })
        setTechie(staff)
  
      }).catch((err)=>{
        alert(err)
  
      })

    }
    fetchdata()
 




  },[selctedTechie])

 const handleSelectedTechie=(data)=>{
  setSelectedtecchi(data)

 }

  
  
  
  return (
    <Container>
    <Box className="breadcrumb">
      <Breadcrumb routeSegments={[{ name: 'Qtech', path: '/batches' }, { name: 'Time Table' }]} />
    </Box>
<Grid >
    <Tooltip title="Add TimeTable">
        <Link to="../time_table/qtech">
    <IconButton aria-label="delete" size="large">
 <AddIcon fontSize="inherit" color="success"  sx={{ fontSize: 40 }} />
</IconButton>
</Link>
    </Tooltip>
    <div style={{marginBottom:"20px"}}>
    <SimpleCard>
          <SimpleDialogDemo  sendData={handleSelectedTechie}/>
        
          
        </SimpleCard>
        </div>
     
        {selctedTechie==="" || typeof selctedTechie==="undefined"?(techie.map((item)=>{
  return(
    <div style={{marginBottom:"20px"}}>
    <SimpleCard title={`Time Table: ${item.staff_name}`} >
<QtechSimpletable techie={item._id} />
</SimpleCard>
</div>

  )
})):( <SimpleCard  >
<QtechSimpletable techie={selctedTechie} />
</SimpleCard>)}
       
     
{/* {techie.map((item)=>{
  return(
    <div style={{marginBottom:"20px"}}>
    <SimpleCard title={`Time Table: ${item.staff_name}`} >
<QtechSimpletable techie={item._id} />
</SimpleCard>
</div>

  )
})} */}





</Grid>

 
    

  
  </Container>
  )
}

export default Qtech_Timetable