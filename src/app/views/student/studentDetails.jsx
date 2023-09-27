import React, { useState } from 'react';
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
import Badge from '@mui/material/Badge';

import CameraIcon from '@mui/icons-material/CameraAlt';
import Axios from 'axios';
import url from '../../../global';
import { useParams } from 'react-router-dom';
import FileUpload from '../material-kit/fileUpload/Propic';
import { Input, InputAdornment, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function StudentsAll({ studentD, setStudent, setNewProfile }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const [on, setOn] = useState(true);
  const [uon, setUOn] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(selectedFile);
  };
  let param = useParams();
  console.log('Id in student details : ' + param.id);
  const [updatedStu, setUpdatedStudent] = useState({
    student_name: '',
    our_reg_no: '',
    date_of_admission: '',
    t_address: '',
    t_pincode: '',
    t_district: '',
    t_state: '',
    p_address: '',
    p_pincode: '',
    p_district: '',
    p_state: '',
    email_id: '',
    contact_no1: '',
    whatsup: '',
    parent_contact: ''
  });
  const IconList = ['edit'];
  const IconList1 = ['check'];
  const [check] = IconList1;

  const handleIconClick = () => {
    setOn((prevState) => !prevState);
  };
  const handleProfile = () => {
    setUOn((prevState) => !prevState);
  };

  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const updateStudent = (e) => {
    setStudent({ ...studentD, [e.target.name]: e.target.value });
    setUpdatedStudent({ ...updatedStu, [e.target.name]: e.target.value });

    console.log(studentD);
  };
  const UpdateProfile = () => {
    console.log('Id in student details : ' + param.id);
    let file = new FormData();

    file.append('name', selectedFile);
    Axios.put(`http://localhost:4000/api/student/update_profile/${param.id}`, file)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setNewProfile((prevState) => !prevState);
          // StudentsAll();
        }
      })
      .catch((err) => {
        alert(' Error !');
        console.log(err);
        // setNewProfile((prevState) => !prevState);
      });
  };
  const Update = () => {
    const student_name = updatedStu.student_name;
    const our_reg_no = updatedStu.our_reg_no;
    const date_of_admission = updatedStu.date_of_admission;
    const t_address = updatedStu.t_address;
    const p_address = updatedStu.p_address;
    const t_pincode = updatedStu.t_pincode;
    const p_pincode = updatedStu.p_pincode;
    const t_district = updatedStu.t_district;
    const p_district = updatedStu.p_district;
    const t_state = updatedStu.t_state;
    const p_state = updatedStu.p_state;
    const email_id = updatedStu.email_id;
    const contact_no1 = updatedStu.contact_no1;
    const whatsup = updatedStu.whatsup;
    const parent_contact = updatedStu.parent_contact;
    console.log(student_name + ' : name');
    console.log(updatedStu + ' : updated name');
    Axios.put(`http://localhost:4000/api/student/update/${param.id}`, {
      student_name,
      our_reg_no,
      date_of_admission,
      t_address,
      p_address,
      t_pincode,
      p_pincode,
      t_district,
      p_district,
      t_state,
      p_state,
      email_id,
      contact_no1,
      whatsup,
      parent_contact
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
        }
      })
      .catch((err) => {
        alert(' Error !');
        console.log(err);
      });
  };
  const uploadUri = url.defaults.UPLOAD_URI;
  // alert(uploadUri);
  console.log(studentD.image);

  return (
    <div>
      <form>
        <div>
          <Item>
            <div style={{ float: 'right' }}>
              <Tooltip title={on ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="small" onClick={handleIconClick}>
                  {on && <span style={{ marginTop: '2px' }}>edit</span>}

                  <span onClick={() => Update()} style={{ marginTop: '2px' }}>
                    check
                  </span>
                </Icon>
              </Tooltip>
              {!on && (
                <Tooltip title={on ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="small" onClick={handleIconClick}>
                    <span style={{ marginTop: '4px' }}>clear</span>
                  </Icon>
                </Tooltip>
              )}
            </div>

            <div>
              <div>
                {studentD?.image ? (
                  <>
                    <img
                      src={`${uploadUri}/${studentD?.image}`}
                      alt="default-avatar"
                      width="100"
                      height="100"
                    />
                    <Input
                      type="file"
                      id="file-upload"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Tooltip title="Upload Picture">
                        <InputAdornment>
                          <IconButton disabled={uon} color="primary" component="span">
                            <CloudUploadIcon />
                          </IconButton>
                        </InputAdornment>
                      </Tooltip>
                    </label>
                  </>
                ) : (
                  <>
                    <img src={imageUrl} alt="avatar" width="150" height="150" />
                    <div>
                      <Input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <Tooltip title="Upload Picture">
                          <InputAdornment>
                            <IconButton disabled={uon} color="primary" component="span">
                              <CloudUploadIcon />
                            </IconButton>
                          </InputAdornment>
                        </Tooltip>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="text-center" style={{ marginTop: '10px' }}>
              <h5 className="text-black text-center">
                <div>
                  <Tooltip title={uon ? 'Check Icon' : 'Edit Icon'}>
                    <Icon fontSize="large" onClick={handleProfile}>
                      {uon && <span style={{ marginTop: '2px' }}>edit</span>}

                      <span onClick={() => UpdateProfile()} style={{ marginTop: '2px' }}>
                        check
                      </span>
                    </Icon>
                  </Tooltip>
                  {!uon && (
                    <Tooltip title={uon ? 'Check Icon' : 'Edit Icon'}>
                      <Icon fontSize="large" onClick={handleProfile}>
                        <span style={{ marginTop: '4px' }}>clear</span>
                      </Icon>
                    </Tooltip>
                  )}
                </div>
                {studentD?.student_name}
              </h5>

              {/* <TextField
              id="standard-basic"
              value={studentD?.student_name}
              variant="standard"
              disabled={on}
              name="student_name"
              onChange={updateStudent}
            /> */}
              {/* <TextField
              id="standard-basic"
              name="student_name"
              value={studentD?.student_name}
              onChange={updateStudent}
              variant="standard"
              disabled={on}
            /> */}
            </div>
          </Item>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Student Name
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="student_name"
                        value={studentD?.student_name}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Office Register Number
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="our_reg_no"
                        value={studentD?.our_reg_no}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Date of Admission
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="date_of_admission"
                        value={studentD?.date_of_admission}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Temporary Address
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_address"
                        value={studentD?.t_address}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Pincode
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_pincode"
                        value={studentD?.t_pincode}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      District
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_district"
                        value={studentD?.t_district}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-primary fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      State
                    </TableCell>
                    <TableCell
                      className="text-primary fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="t_state"
                        value={studentD?.t_state}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      Permanent Address
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_address"
                        value={studentD?.p_address}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      Pincode
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_pincode"
                        value={studentD?.p_pincode}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      District
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_district"
                        value={studentD?.p_district}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      State
                    </TableCell>
                    <TableCell
                      className="fw-bolder"
                      align="start"
                      sx={{ padding: '16px', color: '#8e24aa' }}
                    >
                      <TextField
                        id="standard-basic"
                        name="p_state"
                        value={studentD?.p_state}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Email ID
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="email_id"
                        value={studentD?.email_id}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Contact Number(1)
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="contact_no1"
                        value={studentD?.contact_no1}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      WhatsApp
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="whatsup"
                        value={studentD?.whatsup}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: '2px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Parent's/Guardian's
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        name="parent_contact"
                        value={studentD?.parent_contact}
                        onChange={updateStudent}
                        variant="standard"
                        disabled={on}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </form>
    </div>
  );
}
