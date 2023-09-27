import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
  } from "@mui/material";
  import axios from "axios";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import url from "global";
import ResponsiveDilog from "./ResponsiveDilog";
import { SimpleCard } from "app/components";
import Swal from "sweetalert2";

  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  


function QtechSimpletable(props) {
  console.log("ttt",props.techie)
    const [timetable,setTimetable]=useState([])
  

    useEffect(()=>{
        url.get("techtimetable/view").then((res)=>{
            console.log("res",res.data)
            const fiteredTime=res.data.filter((item)=>{
              return item.tech_id?._id===props.techie

            })
            console.log("filteredTime",fiteredTime)
            setTimetable(fiteredTime)
    
        }).catch((err)=>{
            alert(err)
    
        })
    
    
    },[props.techie])
    console.log("t",timetable)
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const sortTime=[]
    
    
    for (let i = 0; i < daysInWeek.length; i++) {
      for (let j = 0; j < timetable.length; j++) {
        if (timetable[j].dayofweek === daysInWeek[i]) {
          sortTime.push(timetable[j]);
          break;
        }
      }
    }
    
    console.log("sort", sortTime);
    
    
    
    
    
    
    const deleteTimeTable = (id) => {
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
            url.delete(`techtimetable/delete/${id}`)
              .then((res) => {
                console.log(res);
                let newDisplay = timetable.filter((item) => {
                  return item._id !== id;
                });
                setTimetable(newDisplay);
              })
              .catch((err) => {
                console.log(err);
              });
            swalWithBootstrapButtons.fire('Deleted!', 'One row  has been deleted.', 'success');
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire('Cancelled', ' record is safe :)', 'error');
          }
        });
    };
  return (
    <Box width="100%" overflow="auto" >
    <StyledTable>
      <TableHead>
        <TableRow>
          <TableCell align="left">Day</TableCell>
          <TableCell align="left">Session 1[9:30-11:30]</TableCell>
       
          <TableCell align="center">Session 2[11:30-1:30]</TableCell>
          <TableCell align="center">Session 3[2:30-4:30]</TableCell>
          <TableCell align="center">Session 4[4:00-5:30]</TableCell>
      
          
          
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
   
        {sortTime.map((item, index) => (
          <TableRow key={index}>
           
            <TableCell align="left">{item.dayofweek}</TableCell>
            <TableCell align="left">{item.first_session.map((i)=>{
              return(
                <>
                <p>{i.b_name}</p>
                </>
              )
            })}</TableCell>
            <TableCell align="center">{item.second_session.map((v)=>{
              return(
                <>
                <p>{v.b_name}</p>
                </>
              )
            })}</TableCell>
            <TableCell align="center">{item.third_session.map((e)=>{
              return(
                <>
                <p>{e.b_name}</p>
                </>
              )

            })}</TableCell>
             <TableCell align="center">{item.four_session.map((t)=>{
              return(
                <>
                <p>{t.b_name}</p>
                </>
              )

            })}</TableCell>
       
            <TableCell align="right">
              <IconButton onClick={()=>deleteTimeTable(item._id)} >
                <Icon color="error" >close</Icon>
              </IconButton>
              
      
   
            </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </StyledTable>
    
  </Box>
  )
}

export default QtechSimpletable