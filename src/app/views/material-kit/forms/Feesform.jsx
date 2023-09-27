import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
import URL from '../../../../global';

import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import MenuItem from '@mui/material/MenuItem';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const SimpleForm = ({ Sid, count, setCentredModal }) => {
  console.log('Student ID from prop : ' + Sid);

  const [display, setDisplay] = useState([]);
  const [rec_num, setRec_num] = useState('DTQFR1');

  useEffect(() => {
    URL.get('fees/view_fees')
      .then((res) => {
        console.log('datafees', res.data);
        setDisplay(res.data);
        // Find the last record's rec_num and increment it
        const lastRecord = res.data[res.data.length - 1];
        const lastRecNum = lastRecord ? lastRecord.rec_num : 'DTQFR';
        const newRecNum = generateNextRecNum(lastRecNum);
        setRec_num(newRecNum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Sid]); // Run the effect once, when the component mounts

  function generateNextRecNum(lastRecNum) {
    const lastCounter = parseInt(lastRecNum.match(/\d+/)[0]);
    const newCounter = lastCounter + 1;
    return `DTQFR${newCounter}`;
  }

  const [state, setState] = useState({ date: new Date() });
  const [one, setOne] = useState('');
  const [divid, setDivid] = useState('');
  const [totfees, setTotfees] = useState('');
  const [feesd, setFeesd] = useState('');
  // const [alldata, setAlldata] = useState({});
  // const [centredModal, setCentredModal] = useState(false);
  // State to control the modal open/close
  const toggleClose = () => {
    setCentredModal(false);
  };

  const nav = useNavigate();
  useEffect(() => {
    if (Sid) {
      Axios.get(`http://localhost:4000/api/student/viewone/${Sid}`)
        .then((res) => {
          // console.log(res?.data?.s1?.student_name);
          // console.log(res?.data?.s1?.division_id?.d_name);
          let a = res.data.s1.division_id.d_name;
          let divid = res.data.s1.division_id;
          setOne(a);
          setDivid(divid);
          let b = res.data.s1.pending_fees;
          setTotfees(b);

          // alert(one);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Sid, count]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const formSubmit = (event) => {
    let alldata = {
      rec_num: rec_num,
      div_id: divid,
      std_id: Sid,
      pay_type: payType,
      fees_type: feesType,
      status: 'paid',
      f_date: currentDate,
      ...feesd
    };

    Axios.post('http://localhost:4000/api/fees/add_fees', alldata)
      .then((res) => {
        console.log(res.data);
        alert('form submitted successfully');
        toggleClose();
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(event);
  };

  const handleChange = (event) => {
    setFeesd({ ...feesd, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    email
  } = state;

  const [feesType, setFeesType] = useState('');

  const SelectType = (event) => {
    setFeesType(event.target.value);
  };
  const [payType, setPayType] = useState('');

  const PaymentType = (event) => {
    setPayType(event.target.value);
  };
  const [currentDate, setCurrentDate] = useState('');
  // const [changeDate, changeDate] = useState('');

  console.log(feesd);

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
      <ValidatorForm onSubmit={formSubmit} onError={() => null}>
        <p>
          <b>Reciept Number :{rec_num} </b>
          <br></br>
          <b>Division Name :{one} </b>
        </p>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              onChange={SelectType}
              name="fees_type"
              value={feesType}
              label="Choose fees type"
              required
            >
              <MenuItem value="Partial">Partial</MenuItem>
              <MenuItem value="Registration">Registration</MenuItem>
              <MenuItem value="Course Fees">Course Fees</MenuItem>
            </TextField>
            <p>
              <b>Pending Fees :{totfees}</b>
            </p>
            {totfees > 0 ? (
              <TextField type="number" name="amount" label="Paying fees" onChange={handleChange} />
            ) : (
              <TextField
                type="number"
                name="amount"
                label="Paying fees"
                onChange={handleChange}
                value="this field is expired"
                disabled // Make the field readonly if totfees is equal to or less than 0
              />
            )}
            <small>Paid date</small>
            <TextField
              type="date"
              name="fdate"
              value={currentDate}
              // onChange={(e) => setCurrentDate()}
            />
            <TextField
              select
              fullWidth
              value={payType}
              name="pay_type"
              onChange={PaymentType}
              label="Choose payment type"
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField>

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              onChange={handleChange}
              name="remark"
              defaultValue="Remark about receipt"
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
        <Button
          onClick={() => toggleClose()}
          color="warning"
          variant="contained"
          sx={{ float: 'right' }}
        >
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>cancel</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
