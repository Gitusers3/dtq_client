import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import url from 'global';
import ResponsiveDilog from './ResponsiveDilog';
import { SimpleCard } from 'app/components';
import Swal from 'sweetalert2';

const StyledTable = styled(Table)(({ theme }) => ({
  border: '2px solid #ddd', // Add border to the whole table
  whiteSpace: 'pre',
  '& thead': {
    '& tr': {
      '& th': {
        paddingLeft: 10,
        paddingRight: 0,
        border: '1px solid #ddd' // Add border to table header cells
      }
    }
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: 10,
        textTransform: 'capitalize',
        border: '1px solid #ddd' // Add border to table body cells
      }
    }
  }
}));

export default function CogSimpleTable() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    url
      .get('batch/view')
      .then((res) => {
        console.log('res', res.data);
        const ongoingBatches = res.data.filter((batch) => batch.status === 'Ongoing');
        setTimetable(ongoingBatches);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetableByDay = {};

  daysInWeek.forEach((day) => {
    timetableByDay[day] = timetable.filter((item) => item.timings.some((t) => t.day === day));
  });

  console.log('timetableByDay', timetableByDay);

  const deleteTimeTable = (id) => {
    // ...
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell colSpan={5} align="center">
              Cognitive & CodeLab Weekly Schedule
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell align="left">Day</TableCell>
            <TableCell align="left">Timings</TableCell>
            <TableCell align="left">Batch Name</TableCell>
            <TableCell align="center">Room Number</TableCell>
            <TableCell align="center">Techie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daysInWeek.map((day) => (
            <TableRow key={day}>
              <TableCell align="left">{day}</TableCell>
              <TableCell align="left">
                {timetableByDay[day]?.length > 0 ? (
                  timetableByDay[day]?.map((item, index) => (
                    <p key={index}>
                      {item?.timings
                        .filter((t) => t.day === day)
                        .map((t) => {
                          // Split the time into hours and minutes
                          const [fromHours, fromMinutes] = t.from_time.split(':');
                          let fromTime = parseInt(fromHours);
                          const [toHours, toMinutes] = t.to_time.split(':');
                          let toTime = parseInt(toHours);

                          // Determine AM or PM
                          const fromAmpm = fromTime >= 12 ? 'PM' : 'AM';
                          const toAmpm = toTime >= 12 ? 'PM' : 'AM';

                          // Convert to 12-hour format
                          if (fromTime > 12) {
                            fromTime -= 12;
                          }

                          if (toTime > 12) {
                            toTime -= 12;
                          }

                          fromTime = fromTime.toString().padStart(2, '0');
                          toTime = toTime.toString().padStart(2, '0');

                          const fromTimeFormatted = `${fromTime}:${fromMinutes} ${fromAmpm}`;
                          const toTimeFormatted = `${toTime}:${toMinutes} ${toAmpm}`;

                          return `${fromTimeFormatted} - ${toTimeFormatted}`;
                        })
                        .join(', ')}
                    </p>
                  ))
                ) : (
                  <p>-</p> // Display this message if no batches for the day
                )}
              </TableCell>
              <TableCell align="left">
                {timetableByDay[day]?.length > 0 ? (
                  timetableByDay[day]?.map((item, index) => (
                    <p key={index}>
                      {item?.d_id?.d_name === 'Cognitive Solution' ? (
                        <>CS</>
                      ) : item?.d_id?.d_name === 'CodeLab Systems' ? (
                        <>CL</>
                      ) : (
                        ''
                      )}{' '}
                      - {item.b_name}
                    </p>
                  ))
                ) : (
                  <p>-</p> // Display this message if no batches for the day
                )}
              </TableCell>
              <TableCell align="center">
                {timetableByDay[day]?.length > 0 ? (
                  timetableByDay[day]?.map((item, index) => (
                    <p key={index}>{item?.class_id?.cls_name}</p>
                  ))
                ) : (
                  <p>-</p> // Display this message if no batches for the day
                )}
              </TableCell>
              <TableCell align="center">
                {timetableByDay[day]?.length > 0 ? (
                  timetableByDay[day]?.map((item, index) => (
                    <p key={index}>{item?.tech_id.map((tech) => tech?.staff_name).join(', ')}</p>
                  ))
                ) : (
                  <p>-</p> // Display this message if no batches for the day
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
}
