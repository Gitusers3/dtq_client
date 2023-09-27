import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useState, useEffect } from 'react';
import Url from '../../../../global';
import { Group } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main
}));

const StatCards = () => {
  const [divisions, setDivisions] = useState([]);
  const [students, setStudents] = useState([]);
  console.log(divisions);
  console.log(students);
  const divisionStudentCounts = students.reduce((counts, student) => {
    const divisionId = student.division_id._id;

    if (!counts[divisionId]) {
      counts[divisionId] = 1; // Initialize count to 1 if divisionId is encountered for the first time
    } else {
      counts[divisionId]++; // Increment the count for existing divisionId
    }

    return counts;
  }, {});
  console.log(divisionStudentCounts);
  useEffect(() => {
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      console.log('token', token);
      Url.get('/division/view_division', { headers: { authToken: token } })
        .then((res) => {
          console.log('res', res.data);
          setDivisions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
    async function FetchData2() {
      const token = await localStorage.getItem('accessToken');
      console.log('token', token);
      Url.get('student/view', { headers: { authToken: token } })
        .then((res) => {
          console.log('re', res);
          setStudents(res.data.st);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData2();
  }, []);

  // Calculate student counts for each division
  function calculateDivisionStudentCounts(divisions, students) {
    const divisionStudentCounts = {};

    students.forEach((student) => {
      const divisionId = student.division_id._id;

      if (student.all_status === 'Ongoing') {
        if (!divisionStudentCounts[divisionId]) {
          divisionStudentCounts[divisionId] = 1;
        } else {
          divisionStudentCounts[divisionId]++;
        }
      }
    });

    return divisionStudentCounts;
  }

  const updatedCardList = divisions.map((division) => {
    const studentCount = students.reduce((count, student) => {
      if (student.division_id._id === division._id && student.all_status === 'Ongoing') {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      name: division.d_name,
      students: studentCount,
      icon: 'group'
    };
  });

  const cardList = updatedCardList; // Use the updated cardList in your code
  return (
    <Grid container spacing={2} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.students}</Heading>
              </Box>
            </ContentBox>
            <Tooltip title="View Students" placement="top">
              <Link to={'/student/students'}>
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Link>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
