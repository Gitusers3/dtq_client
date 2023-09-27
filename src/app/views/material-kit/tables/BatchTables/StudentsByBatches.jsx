import React from 'react';
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import url from '../../../../../global';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from '../../../../components';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));
export default function CodeLabStudents() {
  const [batch, SetBatch] = useState();
  const [batchId, SetBatchId] = useState();
  const [students, SetStudents] = useState();
  const [count, SetCount] = useState(1);
  let param = useParams();
  console.log('BatchId : ' + param.id);
  useEffect(() => {
    SetBatchId(param.id);

    url
      .get(`batch/viewbatch/${param.id}`)
      .then((res) => {
        console.log(res?.data);
        SetBatch(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);

  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      console.log('tok', token);
      url
        .get('student/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data.st);
          SetStudents(res.data.st);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, [count]);
  console.log(students);

  const addBatch = (studentId) => {
    if (studentId) {
      console.log('student Id', studentId);
      console.log('batch Id', batchId);
      async function FetchData() {
        const token = await localStorage.getItem('accessToken');
        console.log('tok', token);
        url
          .put(`student/addToBatch/${studentId}`, { batchId }, { headers: { authToken: token } })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              SetCount((preValue) => preValue + 1);
            }
          })
          .catch((err) => {
            alert(' Error !');
            console.log(err);
          });
      }
      FetchData();
    }
  };
  const RemoveFromBatch = (studentId) => {
    if (studentId) {
      console.log('student Id', studentId);
      console.log('batch Id', batchId);
      async function FetchData() {
        const token = await localStorage.getItem('accessToken');
        console.log('tok', token);
        url
          .put(`student/RemoveFromBatch/${studentId}`, {}, { headers: { authToken: token } })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              SetCount((preValue) => preValue + 1);
            }
          })
          .catch((err) => {
            alert(' Error !');
            console.log(err);
          });
      }
      FetchData();
    }
  };
  // console.log(batch?.d_id?._id);
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Students' }]} />
        </Box>
        <SimpleCard title={`Un-assigned students for Batch - ${batch?.b_name}`}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {students
              ?.filter(
                (student) =>
                  student?.division_id?._id === batch?.d_id?._id &&
                  !student?.batch_id &&
                  student?.all_status == 'Ongoing'
              )
              ?.map((student, index) => (
                <Grid item xs={3}>
                  <Item>
                    <div style={{ display: 'flex' }}>
                      <div className="w-100">
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {student?.student_name} {/* Assuming student has a 'name' property */}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {student?.college_id?.c_name}, {student?.college_id?.c_address}{' '}
                            {/* Assuming student has a 'description' property */}
                          </Typography>
                        </CardContent>
                      </div>
                      <div className="w-25 p-2">
                        <CardActions sx={{ float: 'right', margin: '-20px' }}>
                          <Tooltip title={`Add to ${batch?.b_name}`} arrow>
                            <IconButton>
                              <Icon onClick={() => addBatch(student?._id)} color="primary">
                                add_to_photos
                              </Icon>
                            </IconButton>
                          </Tooltip>
                          {/* <Button
                        onClick={() => addBatch(student?._id)}
                        size="large"
                        variant="outlined"
                      >
                        Add to {batch?.b_name}
                      </Button> */}
                        </CardActions>
                      </div>
                    </div>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </SimpleCard>
        <br />
        <SimpleCard title={`Assigned students for Batch - ${batch?.b_name}`}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {students
              ?.filter(
                (student) =>
                  student?.division_id?._id === batch?.d_id._id &&
                  student?.batch_id?._id === batch?._id &&
                  student?.all_status == 'Ongoing'
              )
              ?.map((student, index) => (
                <Grid item xs={3}>
                  <Item>
                    <div style={{ display: 'flex' }}>
                      <div className="w-100">
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {student?.student_name} {/* Assuming student has a 'name' property */}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {student?.college_id?.c_name}, {student?.college_id?.c_address}
                            {/* Assuming student has a 'description' property */}
                          </Typography>
                        </CardContent>
                      </div>
                      <div className="w-25 p-2">
                        <CardActions sx={{ float: 'right', margin: '-20px' }}>
                          <Tooltip title={`Remove from ${batch?.b_name}`} arrow>
                            <IconButton>
                              <Icon onClick={() => RemoveFromBatch(student?._id)} color="error">
                                cancel
                              </Icon>
                            </IconButton>
                          </Tooltip>
                          {/* <Button
                        onClick={() => RemoveFromBatch(student?._id)}
                        size="large"
                        color="error"
                        variant="outlined"
                      >
                        Remove from {batch?.b_name}
                      </Button> */}
                        </CardActions>
                      </div>
                    </div>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </SimpleCard>
      </Container>
    </div>
  );
}
