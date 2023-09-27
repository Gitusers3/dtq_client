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
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Url from '../../../global';
import Moment from 'react-moment';
export default function AdditionalDetails({
  studentD,
  setStudent,
  project_details,
  setProject_details,
  currentCollege,
  currentCourse,
  setCurrentCollege,
  setCurrentCourse,
  academicDetails,
  setAcademic_details,
  internshipDetails,
  setInternshipDetails
}) {
  console.log(currentCollege, currentCourse);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  const IconList = ['edit'];
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  const [ton, setTOn] = useState(true);
  const [bon, setBOn] = useState(true);
  const chanegTechie = () => {
    setTOn((prevOn) => !prevOn);
  };
  const chanegBatch = () => {
    setBOn((prevOn) => !prevOn);
  };
  const [pon, setPOn] = useState(true);
  const changeProject = () => {
    setPOn((prevOn) => !prevOn);
  };
  const [ion, setIOn] = useState(true);
  const changeInternship = () => {
    setIOn((prevOn) => !prevOn);
  };
  const [clon, setCol] = useState(true);
  const changeCollege = () => {
    setCol((prevOn) => !prevOn);
  };
  const [acon1, setAcOn1] = useState(true);
  const [acon2, setAcOn2] = useState(true);
  const [acon3, setAcOn3] = useState(true);
  const [acon4, setAcOn4] = useState(true);

  const [editModes, setEditModes] = useState(Array(academicDetails?.length).fill(false));

  const changeAcademics = (index) => {
    setEditModes((prevModes) => {
      const newModes = [...prevModes];
      newModes[index] = !newModes[index];
      return newModes;
    });
  };

  const [techie, setTechie] = useState([]);
  const [batch, setBatch] = useState([]);
  const [project, setProject] = useState({});
  const [selectedTechie, setSelectedTechie] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [updatedbatch, setUpdatedBatch] = useState({
    batch_id: ''
  });
  const [intern, setIntern] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState('');
  const handleSelectInternship = (event) => {
    setSelectedInternship(event.target.value);
  };
  useEffect(() => {
    // Make the API request
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      Url.get('intership/view_intership', {
        headers: { authToken: token }
      })
        .then((res) => {
          console.log(res.data, 123);
          setIntern(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, []);

  const handleSelectChangeofTechie = (event) => {
    setSelectedTechie(event.target.value);
  };
  const handleSelectChangeofBatch = (event) => {
    setSelectedBatch(event.target.value);
    setStudent({ ...studentD, [event.target.name]: event.target.value });
    setUpdatedBatch({ ...updatedbatch, [event.target.name]: event.target.value });
  };

  console.log(studentD);
  console.log(updatedbatch);
  useEffect(() => {
    // Make the API request
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      axios
        .get('http://localhost:4000/api/staff/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data);
          setTechie(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();

    // alert(selectedDivision);
  }, [selectedTechie]);
  useEffect(() => {
    // Make the API request
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      Url.get('batch/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data, 12);
          setBatch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();

    // alert(selectedDivision);
  }, [selectedBatch]);

  const filteredTechie = techie?.filter((t) => t.designation === 'Software Developer');
  const filteredBatch = batch?.filter((t) => t?.d_id?._id === studentD?.division_id?._id);
  console.log('fil', filteredTechie);
  console.log('filtered batch', filteredBatch);
  console.log('tech', techie);

  const [updatedproject, setUpdatedProject] = useState({
    project_title: '',
    project_client_name: '',
    project_client_address: '',
    project_client_contact: '',
    project_client_email: '',
    project_description: '',
    front_end_pro_lang: '',
    backend_pro_lang: '',
    duration: ''
  });
  const [updatedCurrentCollege, setUpdatedCurrentCollege] = useState({
    c_name: ''
  });
  const [updatedCurrentCourse, setUpdatedCurrentCourse] = useState({
    cou_name: ''
  });
  const [updatedInternship, setUpdatedInternship] = useState({
    internship_id: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    no_of_days: '',
    no_of_hours: ''
  });

  const handleSelectChangeofInternship = (e) => {
    setSelectedInternship(e.target.value);
    setInternshipDetails({ ...internshipDetails, [e.target.name]: e.target.value });
    setUpdatedInternship({ ...updatedInternship, [e.target.name]: e.target.value });
  };

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [updatedCourse, setUpdatedCourse] = useState({
    course_id: ''
  });
  useEffect(() => {
    // Make the API request
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      Url.get('course/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data, 12);
          setCourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();
  }, [selectedCourse]);
  const handleSelectChangeofCourse = (e) => {
    setSelectedCourse(e.target.value);
    setStudent({ ...studentD, [e.target.name]: e.target.value });
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [updatedCollege, setUpdatedCollege] = useState({
    college_id: ''
  });
  useEffect(() => {
    // Make the API request
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      Url.get('college/view', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data, 12);
          setColleges(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchdata();
  }, [selectedCollege]);
  const handleSelectChangeofCollege = (e) => {
    setSelectedCollege(e.target.value);
    setStudent({ ...studentD, [e.target.name]: e.target.value });
    setUpdatedCollege({ ...updatedCollege, [e.target.name]: e.target.value });
  };

  const handleProject = (e) => {
    setProject_details({ ...project_details, [e.target.name]: e.target.value });
    setUpdatedProject({ ...updatedproject, [e.target.name]: e.target.value });
  };
  const changecourse = (e) => {
    setCurrentCourse({ ...currentCourse, [e.target.name]: e.target.value });
    setUpdatedCurrentCourse({ ...updatedCurrentCourse, [e.target.name]: e.target.value });
  };
  console.log(updatedCurrentCourse);
  const changecollege = (e) => {
    setCurrentCollege({ ...currentCollege, [e.target.name]: e.target.value });
    setUpdatedCurrentCollege({ ...updatedCurrentCollege, [e.target.name]: e.target.value });
  };
  const handlechangeInternship = (e) => {
    // setInternshipDetails({ ...internshipDetails, [e.target.name]: e.target.value });
    // setUpdatedInternship({ ...updatedInternship, [e.target.name]: e.target.value });
  };

  console.log(updatedCurrentCollege);

  let param = useParams();
  console.log('Id in student details : ' + param.id);
  const UpdateProject = (e) => {
    const project_title = updatedproject.project_title;
    const project_client_name = updatedproject.project_client_name;
    const project_client_address = updatedproject.project_client_address;
    const project_client_contact = updatedproject.project_client_contact;
    const project_client_email = updatedproject.project_client_email;
    const project_description = updatedproject.project_description;
    const front_end_pro_lang = updatedproject.front_end_pro_lang;
    const backend_pro_lang = updatedproject.backend_pro_lang;
    const duration = updatedproject.duration;
    axios
      .put(`http://localhost:4000/api/student/update/${param.id}`, {
        project_title,
        project_client_name,
        project_client_address,
        project_client_contact,
        project_client_email,
        project_description,
        front_end_pro_lang,
        backend_pro_lang,
        duration
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
  const UpdateInternship = (e) => {
    const internship_id = updatedInternship.internship_id;
    const start_date = updatedInternship.start_date;
    const end_date = updatedInternship.end_date;
    const start_time = updatedInternship.start_time;
    const end_time = updatedInternship.end_time;
    const no_of_days = updatedInternship.no_of_days;
    const no_of_hours = updatedInternship.no_of_hours;
    Url.put(`student/update/${param.id}`, {
      internship_id,
      start_date,
      end_date,
      start_time,
      end_time,
      no_of_days,
      no_of_hours
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
  const UpdateBatch = (e) => {
    alert('Update');
    const batch_id = updatedbatch.batch_id;
    Url.put(`student/update/${param.id}`, {
      batch_id
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
  const UpdateCollegeDetails = (e) => {
    const course_id = updatedCourse.course_id;
    const college_id = updatedCollege.college_id;
    Url.put(`student/update/${param.id}`, {
      course_id,
      college_id
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
  console.log(academicDetails);
  console.log(updatedCollege?.college_id);
  const [updatedacademicDetails, setUpdatedAcademicDetails] = useState([
    {
      course: '',
      college: '',
      percentage: ''
    }
  ]);
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...academicDetails];
    updatedDetails[index][field] = value;
    setAcademic_details(updatedDetails);
  };
  console.log(academicDetails, 121);

  const UpdateAcademicDetails = (index, id) => {
    console.log(academicDetails, 888);
    console.log(id, 999);
    const course = academicDetails[index].course;
    const college = academicDetails[index].college;
    const percentage = academicDetails[index].percentage;
    console.log(course, 222);
    console.log(college, 777);
    console.log(percentage, 444);

    console.log(id, 999);
    async function fetchdata() {
      const token = await localStorage.getItem('accessToken');
      Url.put(
        `academics/update/${id}`,
        {
          course,
          college,
          percentage
        },
        { headers: { authToken: token } }
      )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
          }
        })
        .catch((err) => {
          alert(' Error !');
          console.log(err);
        });
    }
    fetchdata();
  };
  return (
    <div>
      <div>
        {studentD?.division_id?.d_name === 'QueueTech Solution' ? (
          <Item sx={{ height: '60px' }}>
            <div style={{ float: 'right' }}>
              <Tooltip title={ton ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="large" onClick={chanegTechie}>
                  {ton && <span style={{ marginTop: '2px' }}>edit</span>}

                  <span style={{ marginTop: '2px' }}>check</span>
                </Icon>
              </Tooltip>
              {!ton && (
                <Tooltip title={ton ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="large" onClick={chanegTechie}>
                    <span style={{ marginTop: '4px' }}>clear</span>
                  </Icon>
                </Tooltip>
              )}
            </div>
            {studentD?.division_id?.d_name === 'QueueTech Solution' ? (
              <h6 className="text-start text-black fw-bolder">Techie</h6>
            ) : (
              <h6 className="text-start text-black fw-bolder">Batch</h6>
            )}
          </Item>
        ) : (
          <Item sx={{ height: '60px' }}>
            <div style={{ float: 'right' }}>
              <Tooltip title={bon ? 'Check Icon' : 'Edit Icon'}>
                <Icon fontSize="large" onClick={chanegBatch}>
                  {bon && <span style={{ marginTop: '2px' }}>edit</span>}

                  <span onClick={UpdateBatch} style={{ marginTop: '2px' }}>
                    check
                  </span>
                </Icon>
              </Tooltip>
              {!bon && (
                <Tooltip title={bon ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="large" onClick={chanegBatch}>
                    <span style={{ marginTop: '4px' }}>clear</span>
                  </Icon>
                </Tooltip>
              )}
            </div>
            {studentD?.division_id?.d_name === 'QueueTech Solution' ? (
              <h6 className="text-start text-black fw-bolder">Techie</h6>
            ) : (
              <h6 className="text-start text-black fw-bolder">Batch</h6>
            )}
          </Item>
        )}
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {studentD?.division_id?.d_name === 'QueueTech Solution' ? (
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Techie Name
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Techie</InputLabel>
                        <Select
                          disabled={ton}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Choose Division"
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
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="text-black"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Batch Name
                    </TableCell>
                    <TableCell
                      className="text-black fw-bolder"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {studentD?.batch_id ? studentD?.batch_id?.b_name : 'Choose Batch'}
                        </InputLabel>
                        <Select
                          disabled={bon}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="batch_id"
                          label={studentD?.batch_id ? studentD?.batch_id?.b_name : 'Choose Batch'}
                          value={selectedBatch}
                          onChange={handleSelectChangeofBatch.bind(this)}
                        >
                          {filteredBatch.map((t) => (
                            <MenuItem key={t._id} value={t._id}>
                              {t.b_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {studentD?.division_id?.d_name === 'QueueTech Solution' ? (
          <>
            <Item sx={{ marginTop: '2px', height: '50px' }}>
              <div style={{ float: 'right' }}>
                <Tooltip title={pon ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="large" onClick={changeProject}>
                    {pon && <span style={{ marginTop: '2px' }}>edit</span>}

                    <span onClick={() => UpdateProject()} style={{ marginTop: '2px' }}>
                      check
                    </span>
                  </Icon>
                </Tooltip>
                {!pon && (
                  <Tooltip title={pon ? 'Check Icon' : 'Edit Icon'}>
                    <Icon fontSize="large" onClick={changeProject}>
                      <span style={{ marginTop: '4px' }}>clear</span>
                    </Icon>
                  </Tooltip>
                )}
              </div>
              <h6 className="text-start text-black fw-bolder">Project</h6>
            </Item>
            <>
              <div style={{ marginTop: '2px' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ margin: '5px' }}>
                        <TableCell
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Project Title
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '10px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.project_title}
                            variant="standard"
                            disabled={pon}
                            name="project_title"
                            onChange={handleProject}
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Project Client
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.project_client_name}
                            variant="standard"
                            name="project_client_name"
                            onChange={handleProject}
                            disabled={pon}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div style={{ marginTop: '2px' }}>
                {/* <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="text-black"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Client Name
                  </TableCell>
                  <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                    <TextField id="standard-basic" value={project_details?.client_name}  variant="standard" disabled={pon} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
              </div>
              <div style={{ marginTop: '2px' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ margin: '5px' }}>
                        <TableCell
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Client Contact Number
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.project_client_contact}
                            variant="standard"
                            name="project_client_contact"
                            onChange={handleProject}
                            disabled={pon}
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Client Email ID
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.project_client_email}
                            variant="standard"
                            disabled={pon}
                            name="project_client_email"
                            onChange={handleProject}
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
                          Frontend Language
                        </TableCell>
                        <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.front_end_pro_lang}
                            variant="standard"
                            disabled={pon}
                            name="front_end_pro_lang"
                            onChange={handleProject}
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
                          Backend Language
                        </TableCell>
                        <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.backend_pro_lang}
                            name="backend_pro_lang"
                            onChange={handleProject}
                            variant="standard"
                            disabled={pon}
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
                          Project Description
                        </TableCell>
                        <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={project_details?.project_description}
                            name="project_description"
                            onChange={handleProject}
                            variant="standard"
                            disabled={pon}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </>
        ) : (
          <>
            <Item sx={{ marginTop: '2px', height: '50px' }}>
              <div style={{ float: 'right' }}>
                <Tooltip title={ion ? 'Check Icon' : 'Edit Icon'}>
                  <Icon fontSize="large" onClick={changeInternship}>
                    {ion && <span style={{ marginTop: '2px' }}>edit</span>}

                    <span onClick={() => UpdateInternship()} style={{ marginTop: '2px' }}>
                      check
                    </span>
                  </Icon>
                </Tooltip>
                {!ion && (
                  <Tooltip title={ion ? 'Check Icon' : 'Edit Icon'}>
                    <Icon fontSize="large" onClick={changeInternship}>
                      <span style={{ marginTop: '4px' }}>clear</span>
                    </Icon>
                  </Tooltip>
                )}
              </div>
              <h6 className="text-start text-black fw-bolder">Internship Details</h6>
            </Item>
            <>
              <div style={{ marginTop: '2px' }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ margin: '5px' }}>
                        <TableCell
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Internship
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '10px' }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              {internshipDetails?.internship_id?.intership_on}
                            </InputLabel>
                            <Select
                              disabled={ion}
                              variant="standard"
                              id="demo-simple-select"
                              name="internship_id"
                              label={internshipDetails?.internship_id?.intership_on}
                              value={selectedInternship}
                              onChange={handleSelectChangeofInternship.bind(this)}
                            >
                              {intern?.map((intern) => (
                                <MenuItem key={intern._id} value={intern._id}>
                                  {intern?.intership_on}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Start Date{' '}
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            fullWidth="true"
                            value={internshipDetails?.start_date}
                            variant="standard"
                            name="start_date"
                            onChange={handleSelectChangeofInternship}
                            disabled={ion}
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          End Date{' '}
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            fullWidth="true"
                            value={internshipDetails?.end_date}
                            variant="standard"
                            name="end_date"
                            onChange={handleSelectChangeofInternship}
                            disabled={ion}
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          Start Time
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={internshipDetails?.start_time}
                            variant="standard"
                            disabled={ion}
                            name="start_time"
                            fullWidth={true}
                            onChange={handleSelectChangeofInternship}
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
                          className="text-black"
                          component="th"
                          scope="row"
                          sx={{ padding: '16px' }}
                        >
                          End Time
                        </TableCell>
                        <TableCell className="text-black" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={internshipDetails?.end_time}
                            variant="standard"
                            disabled={ion}
                            name="end_time"
                            fullWidth={true}
                            onChange={handleSelectChangeofInternship}
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
                          Number of Days
                        </TableCell>
                        <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={internshipDetails?.no_of_days}
                            name="no_of_days"
                            onChange={handleSelectChangeofInternship}
                            variant="standard"
                            disabled={ion}
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
                          Number of Hours
                        </TableCell>
                        <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                          <TextField
                            id="standard-basic"
                            value={internshipDetails?.no_of_hours}
                            name="no_of_hours"
                            onChange={handleSelectChangeofInternship}
                            variant="standard"
                            disabled={ion}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </>
        )}
        <div style={{ marginTop: '2px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder text-center"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px', fontSize: '16px', textTransform: 'uppercase' }}
                  >
                    Academic Details
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ marginTop: '5px' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    SL No
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="start"
                    sx={{ padding: '16px' }}
                  >
                    1
                  </TableCell>
                  <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                    <div style={{ float: 'right' }}>
                      <Tooltip title={clon ? 'Check Icon' : 'Edit Icon'}>
                        <Icon fontSize="large" onClick={changeCollege}>
                          {clon && <span style={{ marginTop: '2px' }}>edit</span>}
                          <span onClick={() => UpdateCollegeDetails()} style={{ marginTop: '2px' }}>
                            check
                          </span>
                        </Icon>
                      </Tooltip>
                      {!clon && (
                        <Tooltip title={clon ? 'Check Icon' : 'Edit Icon'}>
                          <Icon fontSize="large" onClick={changeCollege}>
                            <span style={{ marginTop: '4px' }}>clear</span>
                          </Icon>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    Course
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {studentD?.course_id?.cou_name}
                      </InputLabel>
                      <Select
                        disabled={clon}
                        fullWidth
                        variant="standard"
                        id="demo-simple-select"
                        name="course_id"
                        label={studentD?.course_id?.cou_name}
                        value={selectedCourse}
                        onChange={handleSelectChangeofCourse.bind(this)}
                      >
                        {courses?.map((course) => (
                          <MenuItem key={course._id} value={course._id}>
                            {course?.cou_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ margin: '5px' }}>
                  <TableCell
                    className="fw-bolder"
                    component="th"
                    scope="row"
                    sx={{ padding: '16px' }}
                  >
                    College
                  </TableCell>
                  <TableCell
                    className="fw-bolder text-center"
                    align="center"
                    sx={{ padding: '16px' }}
                  >
                    -
                  </TableCell>
                  <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {studentD?.college_id?.c_name}
                      </InputLabel>
                      <Select
                        disabled={clon}
                        fullWidth
                        variant="standard"
                        id="demo-simple-select"
                        name="college_id"
                        label={studentD?.college_id?.c_name}
                        value={selectedCollege}
                        onChange={handleSelectChangeofCollege.bind(this)}
                      >
                        {colleges?.map((college) => (
                          <MenuItem key={college._id} value={college._id}>
                            {college?.c_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {academicDetails?.map((academicDetails, index) => (
          <div key={index} style={{ marginTop: '5px' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow className="bg-warning" sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      SL No
                    </TableCell>
                    <TableCell
                      className="fw-bolder text-center"
                      align="start"
                      sx={{ padding: '16px' }}
                    >
                      {index + 2}
                    </TableCell>
                    <TableCell className="fw-bolder" align="center" sx={{ padding: '16px' }}>
                      <div style={{ float: 'right' }}>
                        <Tooltip title={acon1 ? 'Check Icon' : 'Edit Icon'}>
                          <Icon fontSize="large" onClick={() => changeAcademics(index)}>
                            {!editModes[index] && <span style={{ marginTop: '2px' }}>edit</span>}
                            <span
                              onClick={() => UpdateAcademicDetails(index, academicDetails?._id)}
                              style={{ marginTop: '2px' }}
                            >
                              check
                            </span>
                          </Icon>

                          {editModes[index] && (
                            <Icon fontSize="large" onClick={() => changeAcademics(index)}>
                              <span style={{ marginTop: '4px' }}>clear</span>
                            </Icon>
                          )}
                        </Tooltip>
                        {!acon1 && (
                          <Tooltip title={acon1 ? 'Check Icon' : 'Edit Icon'}>
                            <Icon fontSize="large" onClick={changeAcademics}>
                              <span style={{ marginTop: '4px' }}>clear</span>
                            </Icon>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Course
                    </TableCell>
                    <TableCell
                      className="fw-bolder text-center"
                      align="center"
                      sx={{ padding: '16px' }}
                    >
                      -
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={academicDetails?.course}
                        variant="standard"
                        name="course"
                        onChange={(e) => handleDetailChange(index, 'course', e.target.value)}
                        disabled={!editModes[index]} // Enable only when in edit mode
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      College
                    </TableCell>
                    <TableCell
                      className="fw-bolder text-center"
                      align="center"
                      sx={{ padding: '16px' }}
                    >
                      -
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={academicDetails?.college}
                        variant="standard"
                        name="college"
                        onChange={(e) => handleDetailChange(index, 'college', e.target.value)}
                        disabled={!editModes[index]} // Enable only when in edit mode
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ margin: '5px' }}>
                    <TableCell
                      className="fw-bolder"
                      component="th"
                      scope="row"
                      sx={{ padding: '16px' }}
                    >
                      Percentage
                    </TableCell>
                    <TableCell
                      className="fw-bolder text-center"
                      align="center"
                      sx={{ padding: '16px' }}
                    >
                      -
                    </TableCell>
                    <TableCell className="fw-bolder" align="start" sx={{ padding: '16px' }}>
                      <TextField
                        id="standard-basic"
                        value={academicDetails?.percentage}
                        variant="standard"
                        name="percentage"
                        onChange={(e) => handleDetailChange(index, 'percentage', e.target.value)}
                        disabled={!editModes[index]} // Enable only when in edit mode
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
