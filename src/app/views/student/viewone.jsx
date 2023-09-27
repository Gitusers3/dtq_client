import React from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
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
import StudentsAll from './studentDetails';
import AdditionalDetails from './AdditionalDetails';
import FeesDetails from './FeesDetails';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import URL from 'global';
import { useEffect, useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default function Viewone() {
  let param = useParams();
  console.log('Id : ' + param.id);
  const [student, setStudent] = useState({});
  const [currentCollege, setCurrentCollege] = useState({});
  const [currentCourse, setCurrentCourse] = useState({});
  const [studentfees, setStudentfees] = useState({});
  const [totalfeespaid, setTotalfeespaid] = useState(0);
  const [newprofile, setNewProfile] = useState(true);
  const [project_details, setProject_details] = useState([]);
  const [academicDetails, setAcademic_details] = useState();
  const [internshipDetails, setInternshipDetails] = useState([]);
  useEffect(() => {
    URL.get(`student/viewone/${param.id}`)
      .then((res) => {
        // console.log(res?.data?.s1?.student_name);
        console.log(res?.data + 'response');
        let a = res.data.s1;
        let i = res.data.p1;
        let ac = res.data.academics;

        console.log('res', res.data);
        setStudent(a);
        let pro = res.data.s1.project_id;
        let curcol = res.data.s1.college_id;
        let curCrs = res.data.s1.course_id;
        setCurrentCollege(curcol);
        setCurrentCourse(curCrs);
        setProject_details(pro);
        setAcademic_details(ac);
        setInternshipDetails(i);

        // alert(a);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newprofile]);
  console.log('intership details', internshipDetails);
  console.log('pro', project_details);
  console.log('st', student);
  console.log('ac', academicDetails);

  useEffect(() => {
    Axios.get(`http://localhost:4000/api/fees/view_student_fees/${param.id}`)
      .then((res) => {
        console.log(res?.data, 'response');
        let d = res?.data || []; // Default to an empty array if data is not available
        setStudentfees(d);

        // Calculate the total sum of all amounts in the array
        const totalPaid = d.reduce((total, item) => total + item.amount, 0);
        setTotalfeespaid(totalPaid);
        console.log(totalPaid + ' fees paid');
        console.log(totalfeespaid + ' total fees paid');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);

  console.log(student, 'student');

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Student' }]} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <StudentsAll studentD={student} setNewProfile={setNewProfile} setStudent={setStudent} />
          </Grid>
          <Grid item xs={4}>
            <AdditionalDetails
              studentD={student}
              currentCollege={currentCollege}
              currentCourse={currentCourse}
              setCurrentCollege={setCurrentCollege}
              setCurrentCourse={setCurrentCourse}
              setStudent={setStudent}
              setProject_details={setProject_details}
              project_details={project_details}
              academicDetails={academicDetails}
              setAcademic_details={setAcademic_details}
              internshipDetails={internshipDetails}
              setInternshipDetails={setInternshipDetails}
            />
          </Grid>
          <Grid item xs={4}>
            <FeesDetails studentD={student} setStudent={setStudent} paidFees={totalfeespaid} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
