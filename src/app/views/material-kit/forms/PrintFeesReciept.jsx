import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment';
import { Button, styled } from '@mui/material';
import Cs from '../../../../images/CS.png';
import CL from '../../../../images/CL.png';
import QT from '../../../../images/Qt.png';
import { Breadcrumb } from 'app/components';
import SimpleCard2 from 'app/components/SimpleCard2';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import url from 'global';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PrintIcon from '@mui/icons-material/Print';
import './css/print.css';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

export default function Fees_Reciept() {
  let Fid = useParams();
  console.log(Fid);
  const [state, setState] = useState({ date: new Date() });
  const [one, setOne] = useState('');
  const [divid, setDivid] = useState('');
  const [totfees, setTotfees] = useState('');
  const [fees, setFees] = useState('');
  const [student, setStudent] = useState('');
  const [college, setCollege] = useState('');
  const [collegeName, setCollegeName] = useState();

  // const [centredModal, setCentredModal] = useState(false);
  // State to control the modal open/close

  const nav = useNavigate();
  useEffect(() => {
    url
      .get(`fees/view_one_fees/${Fid.id}`)
      .then((res) => {
        // console.log(res?.data?.s1?.student_name);
        // console.log(res?.data?.s1?.division_id?.d_name);
        console.log(res.data + 'data');
        setFees(res.data);
        let a = res.data.div_id.d_name;
        let divid = res.data.div_id;
        setOne(a);
        setDivid(divid);
        let b = res.data?.std_id?.college_id;
        setCollege(b);
        let s = res.data?.std_id?.student_name;
        setStudent(s);
        console.log('Division : ' + a, 'College ID : ' + b, 'Division : ' + divid);
      })
      .catch((err) => {
        console.log(err);
      });
    url
      .get(`college/viewCollege/${college}`)
      .then((res) => {
        // console.log(res?.data?.s1?.student_name);
        // console.log(res?.data?.s1?.division_id?.d_name);
        console.log('resdata', res.data);
        let cl = res.data?.c_name;
        setCollegeName(cl);
        console.log('College : ' + cl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [college]);
  console.log(student);
  console.log(college);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const formSubmit = (event) => {
    event.preventDefault();

    // console.log(event);
  };

  console.log('fees details', fees);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Print Page', // Optional title for the printed document
    onBeforePrint: () => {
      // Add any code you want to run before printing (optional)
    },
    onAfterPrint: () => {
      // Add any code you want to run after printing (optional)
    }
  });
  const dateString = fees?.f_date;

  // Convert the date string to a Date object
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Receipt' }]} />
        </Box>
        <Grid item>
          <button className="btn btn-warning fw-bolder m-3" onClick={handlePrint}>
            <PrintIcon style={{ color: 'black', fontSize: '30px', cursor: 'pointer' }} />
            Print
          </button>
        </Grid>

        <div className="printable-content d-block w-100 p-3" ref={printRef}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div style={{ marginTop: '30px' }}>
                <SimpleCard2>
                  <div className="d-flex" style={{ gap: '300px', height: '20px' }}>
                    <div className="w-100">
                      {one === 'Cognitive Solution' && (
                        <img src={Cs} alt="Cognitive Solution" style={{ width: '200px' }} />
                      )}

                      {one === 'QueueTech Solution' && (
                        <img src={QT} alt="QueueTech Solution" style={{ width: '200px' }} />
                      )}

                      {one === 'CodeLab Systems' && (
                        <img src={CL} alt="CodeLab Systems" style={{ width: '130px' }} />
                      )}
                    </div>
                    <div className="w-100 text-end">
                      <h6>
                        <b>Light House Condominium,</b>
                      </h6>
                      <h6>
                        <b>Bavutagudda, Mangalore</b>
                      </h6>
                      <h6>
                        <b>7349350390/0824-428343</b>
                      </h6>
                    </div>
                  </div>
                  <br />
                  <br />
                  <p className="text-center fw-bolder" style={{ opacity: '0.5', fontSize: '10px' }}>
                    STUDENT COPY
                  </p>
                  <hr />

                  <div className="table-responsive">
                    <MDBTable borderless>
                      <MDBTableHead>
                        <tr>
                          <td scope="col" className="text-start">
                            Receipt No :{' '}
                            <span style={{ borderBottom: '1px dashed ' }}>{fees?.rec_num}</span>
                          </td>
                          <td scope="col" className="text-start"></td>
                          <td scope="col" className="text-end">
                            Date :{' '}
                            <span style={{ borderBottom: '1px dashed ' }}>
                              <Moment format="DD-MM-YYYY">{fees?.f_date}</Moment>
                            </span>
                          </td>
                        </tr>
                      </MDBTableHead>
                    </MDBTable>
                    <hr />
                    <MDBTable borderless className="mt-5">
                      <MDBTableBody>
                        <tr>
                          <td>
                            <span className="fw-bolder">Received From :</span> {student}
                          </td>
                          <td></td>
                          <td className="text-end">
                            <span className="fw-bolder">Received For :</span> Academic Internship (
                            {fees?.fees_type})
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">College/Work Place :</span> {collegeName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">Payment Type :</span> {fees?.pay_type}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">Amount :</span> ₹ {fees?.amount}
                            /-
                          </td>
                          <td></td>
                          <td className="text-center">
                            <span className="fw-bold">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIGNATURE
                            </span>
                          </td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    {/* <table className="table  table-borderless">
                      <thead>
                        <tr>
                          <th className="text-center fw-bolder ">
                            <b></b>
                          </th>
                          <th className="text-center fw-bolder w-50"></th>
                          <th className="text-center fw-bolder ">
                            <b>Date</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th
                            className="text-center fw-bolder"
                            style={{ border: '2px solid black', padding: '15px' }}
                          ></th>
                          <th className="text-center fw-bolder w-50"></th>
                          <th
                            className="text-center fw-bolder"
                            style={{ border: '2px solid black', padding: '15px' }}
                          ></th>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                  {/*  */}
                </SimpleCard2>
              </div>
            </Grid>
            <br />
            <br />
            <Grid item xs={12}>
              <div style={{ marginTop: '30px' }}>
                <div className="d-flex">
                  <div className="flex-grow-2">
                    <hr className="border-dashed " style={{ border: '2px dashed black' }} />
                  </div>
                  <div className="mt-0">
                    <ContentCutIcon />
                    {/* Change the 'size' prop to set the desired icon size */}
                  </div>
                  <div className="flex-grow-1 ">
                    <hr className="border-bottom " style={{ border: '2px dashed black' }} />
                  </div>
                </div>
              </div>
            </Grid>
            <br />
            <Grid item xs={12}>
              <div style={{ marginTop: '-10px' }}>
                <SimpleCard2>
                  <div className="d-flex" style={{ gap: '300px', height: '20px' }}>
                    <div className="w-100">
                      {one === 'Cognitive Solution' && (
                        <img src={Cs} alt="Cognitive Solution" style={{ width: '200px' }} />
                      )}

                      {one === 'QueueTech Solution' && (
                        <img src={QT} alt="QueueTech Solution" style={{ width: '200px' }} />
                      )}

                      {one === 'CodeLab Systems' && (
                        <img src={CL} alt="CodeLab Systems" style={{ width: '130px' }} />
                      )}
                    </div>
                    <div className="w-100 text-end">
                      <h6>
                        <b>Light House Condominium,</b>
                      </h6>
                      <h6>
                        <b>Bavutagudda, Mangalore</b>
                      </h6>
                      <h6>
                        <b>7349350390/0824-428343</b>
                      </h6>
                    </div>
                  </div>
                  <br />
                  <br />
                  <p className="text-center fw-bolder" style={{ opacity: '0.5', fontSize: '10px' }}>
                    OFFICE COPY
                  </p>
                  <hr />

                  <div className="table-responsive">
                    <MDBTable borderless>
                      <MDBTableHead>
                        <tr>
                          <td scope="col" className="text-start">
                            Receipt No :{' '}
                            <span style={{ borderBottom: '1px dashed ' }}>{fees?.rec_num}</span>
                          </td>
                          <td scope="col" className="text-start"></td>
                          <td scope="col" className="text-end">
                            Date :{' '}
                            <span style={{ borderBottom: '1px dashed ' }}>
                              <Moment format="DD-MM-YYYY">{fees?.f_date}</Moment>
                            </span>
                          </td>
                        </tr>
                      </MDBTableHead>
                    </MDBTable>
                    <hr />
                    <MDBTable borderless className="mt-5">
                      <MDBTableBody>
                        <tr>
                          <td>
                            <span className="fw-bolder">Received From :</span> {student}
                          </td>
                          <td></td>
                          <td className="text-end">
                            <span className="fw-bolder">Received For :</span> Academic Internship (
                            {fees?.fees_type})
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">College/Work Place :</span> {collegeName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">Payment Type :</span> {fees?.pay_type}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fw-bolder">Amount :</span> ₹ {fees?.amount}
                            /-
                          </td>
                          <td></td>
                          <td className="text-center">
                            <span className="fw-bold">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIGNATURE
                            </span>
                          </td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    {/* <table className="table  table-borderless">
                      <thead>
                        <tr>
                          <th className="text-center fw-bolder ">
                            <b></b>
                          </th>
                          <th className="text-center fw-bolder w-50"></th>
                          <th className="text-center fw-bolder ">
                            <b>Date</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th
                            className="text-center fw-bolder"
                            style={{ border: '2px solid black', padding: '15px' }}
                          ></th>
                          <th className="text-center fw-bolder w-50"></th>
                          <th
                            className="text-center fw-bolder"
                            style={{ border: '2px solid black', padding: '15px' }}
                          ></th>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                </SimpleCard2>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
