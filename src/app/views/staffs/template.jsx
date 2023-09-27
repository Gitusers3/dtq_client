import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import URL from '../../../global';
export default function ProfileStatistics({ count, Staffid, setCentredModal }) {
  console.log('Staff Id for retrive : ' + Staffid);
  const [staff, setStaff] = useState({});
  useEffect(() => {
    URL.get(`staff/viewone/${Staffid}`)
      .then((res) => {
        // console.log(res?.data?.s1?.student_name);
        console.log(res?.data);
        let a = res.data;
        setStaff(a);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Staffid]);
  console.log(staff);
  const uploadUri = URL.defaults.StaffUPLOAD_URI;
  const imageUrl =
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

  return (
    <>
      <MDBCardBody className="text-center">
        <div className="mt-3 mb-4">
          {staff?.profile ? (
            <>
              <MDBCardImage
                src={`${uploadUri}/${staff?.profile}`}
                className="rounded-circle"
                fluid
                style={{ width: '200px' }}
              />
            </>
          ) : (
            <>
              <MDBCardImage
                src={imageUrl}
                className="rounded-circle"
                fluid
                style={{ width: '200px' }}
              />
            </>
          )}
        </div>
        <MDBTypography tag="h4">
          {staff?.staff_name}{' '}
          <span className="small text-muted mb-0" style={{ textTransform: 'capitalize' }}>
            ( {staff?.gender} )
          </span>
        </MDBTypography>
        <MDBTypography tag="h4">{staff?.employee_code}</MDBTypography>
        <MDBCardText className="text-muted mb-4">
          {staff?.designation} <span className="mx-2">|</span> {staff?.role_id?.role}
        </MDBCardText>
        <div className="mb-4 pb-2">
          <Tooltip title="contact number1">
            <MDBBtn outline floating>
              <MDBIcon fab icon="" size="sm">
                {staff?.contact_no1}
              </MDBIcon>
            </MDBBtn>
          </Tooltip>
          <Tooltip title="contact number2">
            <MDBBtn outline floating className="mx-1">
              <MDBIcon fab icon="" size="sm">
                {staff?.contact_no2}
              </MDBIcon>
            </MDBBtn>
          </Tooltip>
          <Tooltip title="Guardian number">
            <MDBBtn outline floating>
              <MDBIcon fab icon="" size="sm">
                {staff?.gcontact}
              </MDBIcon>
            </MDBBtn>
          </Tooltip>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered" cellPadding="5px" cellSpacing="5px">
            <tr>
              <th className="text-start">Email ID</th>
              <th className="text-start">{staff?.email}</th>
              <th className="text-start">Marital Status</th>
              <th className="text-start">{staff?.marital_status}</th>
            </tr>
            <tr>
              <th className="text-start">Category</th>
              <th className="text-start">{staff?.employee_category}</th>
              <th className="text-start">Employment Type</th>
              <th className="text-start">{staff?.employee_type}</th>
            </tr>
            <tr>
              <th className="text-start">Permanent Address</th>
              <th className="text-start">{staff?.paddress}</th>
              <th className="text-start">Temporary Address</th>
              <th className="text-start">{staff?.taddress}</th>
            </tr>
            <tr>
              <th className="text-start">Aadhahr Number</th>
              <th className="text-start">{staff?.adhar_no}</th>
              <th className="text-start">PAN</th>
              <th className="text-start">{staff?.pan_no}</th>
            </tr>
            <tr>
              <th className="text-start">Guardian</th>
              <th className="text-start">{staff?.gname}</th>
              <th className="text-start">Relation</th>
              <th className="text-start">{staff?.relationship}</th>
            </tr>
          </table>
        </div>
        <div className="d-flex justify-content-between text-center mt-5 mb-2">
          <div>
            <MDBCardText className="mb-1 h5">{staff?.doj}</MDBCardText>
            <MDBCardText className="small text-muted mb-0">Date of Joining</MDBCardText>
          </div>
          <div>
            <MDBCardText className="mb-1 h5">{staff?.blood_group}</MDBCardText>
            <MDBCardText className="small text-muted mb-0">Bloob Group</MDBCardText>
          </div>
          <div>
            <MDBCardText className="mb-1 h5">{staff?.dob}</MDBCardText>
            <MDBCardText className="small text-muted mb-0">Date of Birth</MDBCardText>
          </div>
        </div>
      </MDBCardBody>
    </>
  );
}
