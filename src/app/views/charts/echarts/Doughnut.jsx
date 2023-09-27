import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

const DoughnutChart = ({ pending, paidFees, height, color = [] }) => {
  console.log(pending);
  console.log(paidFees);
  // alert(pending + ' paid fees in chart from prop in doughnut');
  // alert(paidFees + ' pending fees in chart from prop in doughnut cgcg');
  const [pd, setPd] = useState(0);
  const [pnd, setPnd] = useState(0);

  console.log(pnd + 'pending fees in chart');
  console.log(pnd + 'pending fees in chart');
  const theme = useTheme();

  const option = {
    legend: {
      show: true,
      itemGap: 20,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    tooltip: { show: false, trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
    yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

    label: {
      fontSize: 13,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily
    },

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
          show: false,
          position: 'center'
        },

        data: [
          { value: pending, name: `Pending: ${pending}` },
          { value: paidFees, name: `Paid: ${paidFees}` }
        ],

        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' },
          label: {
            show: true,
            formatter: '{b} \n{c} ({d}%)',
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.primary,
            fontSize: 14
          }
        }
      }
    ]
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default DoughnutChart;
