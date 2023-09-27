import { Button, Grid, styled } from '@mui/material';
import Cs from '../../../../images/CS.png';
import CL from '../../../../images/CL.png';
import QT from '../../../../images/Qt.png';

import { useNavigate } from 'react-router-dom';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import url from 'global';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Moment from 'react-moment';
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

export default function Fees_Reciept({ Fid, count, setCentredModal }) {
  console.log('FEES ID from prop : ' + Fid);
  const [state, setState] = useState({ date: new Date() });
  const [one, setOne] = useState('');
  const [divid, setDivid] = useState('');
  const [totfees, setTotfees] = useState('');
  const [fees, setFees] = useState('');
  const [student, setStudent] = useState('');
  const [college, setCollege] = useState();
  const [collegeName, setCollegeName] = useState();

  // const [centredModal, setCentredModal] = useState(false);
  // State to control the modal open/close
  const toggleClose = () => {
    setCentredModal(false);
  };

  const nav = useNavigate();
  useEffect(() => {
    url
      .get(`fees/view_one_fees/${Fid}`)
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
  }, [count]);
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

  const [currentDate, setCurrentDate] = useState('');
  // const [changeDate, changeDate] = useState('');

  console.log('fees', fees);

  // Function to get the current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if month or day is less than 10
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  // Set the initial state to the current date when the component mounts
  useState(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <div>
      <div className="d-flex" style={{ gap: '300px' }}>
        <div className="w-100">
          {one === 'Cognitive Solution' && (
            <img src={Cs} alt="Cognitive Solution" style={{ width: '200px' }} />
          )}

          {one === 'QueueTech Solution' && (
            <img src={QT} alt="QueueTech Solution" style={{ width: '200px' }} />
          )}

          {one === 'CodeLab Systems' && (
            <img src={CL} alt="CodeLab Systems" style={{ width: '200px' }} />
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
      <hr />

      <div className="table-responsive">
        <table className="table  table-borderless">
          <thead>
            <tr>
              <th className="text-center fw-bolder ">
                <b>Receipt No</b>
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
              >
                <b>{fees?.rec_num}</b>
              </th>
              <th className="text-center fw-bolder w-50"></th>
              <th
                className="text-center fw-bolder"
                style={{ border: '2px solid black', padding: '15px' }}
              >
                <Moment format="DD-MM-YYYY">
                  <b>{fees?.f_date}</b>
                </Moment>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex">
        <div className="w-50">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>Received From</p>
        </div>
        <div className="w-100">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>: {student}</p>
        </div>
        <div className="w-100 text-start">
          <p style={{ fontSize: '15px' }}> </p>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>Received For</p>
        </div>
        <div className="w-100">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>: Academic Internship</p>
        </div>
        <div className="w-100 text-start">
          <p style={{ fontSize: '15px' }}> </p>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>College/Work Place</p>
        </div>
        <div className="w-100">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>: {collegeName}</p>
        </div>
        <div className="w-100 text-start">
          <p style={{ fontSize: '15px' }}> </p>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>Amount For</p>
        </div>
        <div className="w-100">
          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>: {fees?.fees_type}</p>
        </div>
        <div className="w-100 text-start">
          <p style={{ fontSize: '15px' }}> </p>
        </div>
      </div>
      <Grid container spacing={2} columns={24}>
        <Grid item xs={8}>
          <div className="d-flex">
            <div className="w-100">
              <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>Payment Type</p>
            </div>
            <div className="w-50">
              <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>: {fees?.pay_type}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="w-100 text-center">
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>Amount</p>
          </div>
          <div
            className="w-100 d-flex justify-content-center"
            style={{ border: '2px solid black', alignItems: 'center', alignContent: 'center' }}
          >
            <p className="text-center" style={{ fontSize: '15px', fontWeight: 'bolder' }}>
              {' '}
              {fees?.amount}/-
            </p>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="w-100 text-center">
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}></p>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <p className="text-center" style={{ fontSize: '15px', fontWeight: 'bolder' }}>
              {' '}
              SIGNATURE
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
