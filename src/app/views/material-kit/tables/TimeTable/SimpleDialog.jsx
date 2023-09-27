import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState ,useEffect} from 'react';
import url from 'global';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {

    const [techie,setTechie]=useState([])
    useEffect(()=>{
      async function fetchadata(){
        const token=await localStorage.getItem("accessToken")
        console.log("tt",token)
        url.get('staff/view',{headers:{"authToken":token}}).then((res)=>{
          console.log("res",res.data)
      
        const staff=res.data.filter((item)=>{
          return item.designation==="Software Developer"
  
        })
        setTechie(staff)
  
      }).catch((err)=>{
        alert(err)
  
      })

      }
      fetchadata()
       
    
      },[])

      console.log("tech",techie)

  


  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }
  function handleListItemClick(value,id) {
    onClose(value,id);
    localStorage.setItem("tid",id)
    localStorage.setItem("techie",value)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Choose Techie</DialogTitle>
      <List>
        {techie.map((tech) => (
          <ListItem button onClick={() => handleListItemClick(tech.staff_name,tech._id)} key={tech.staff_name}>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={tech.staff_name} />
          </ListItem>
        ))}

        <ListItem button onClick={() => handleListItemClick('All')}>
          <ListItemAvatar>
            <Avatar>
            <HowToRegIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="View All" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');
  const [techid,setTechid]=useState("")

  const handleClickOpen = () => setOpen(true);

  const handleClose = (value,id) => {
    setOpen(false);
    setSelectedValue(value);
    setTechid(id)
    props.sendData(id)
    
  };

  return (
    <Box>
      <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select Techie
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </Box>
  );
}
