import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
import Url from '../../../../global';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();
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
      name: divisions.d_name,
      students: studentCount
    };
  });
  const formattedChartData = divisions.map((division) => {
    const studentCount = students.reduce((count, student) => {
      if (student.division_id._id === division._id && student.all_status === 'Ongoing') {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      value: studentCount,
      name: division.d_name
    };
  });

  // Now 'formattedChartData' has the structure you provided

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: 'roboto'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    xAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto'
            },
            formatter: '{a}'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'bolder'
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} ({d}%)'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: formattedChartData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'green'
          }
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default DoughnutChart;
