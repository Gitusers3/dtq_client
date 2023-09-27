import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StudentAll from '../tables/StudentAll';
import StudentQt from '../tables/StudentQt';
import StudentCd from '../tables/StudentCd';
import StudentCq from '../tables/StudentCq';
import CodelabBatches from 'app/views/material-kit/tables/BatchTables/CodelabBatches';
import CognitiveBatches from 'app/views/material-kit/tables/BatchTables/CognitiveBatches';
import QuetechBatches from 'app/views/material-kit/tables/BatchTables/QuetechBatches';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function LabTabs() {
  const [divsn1, setDivsn1] = useState(['All']);
  const [divsn, setDivsn] = useState([]);

  useEffect(() => {
    // Make the API request
    const newvalue = localStorage.getItem('batchtab');
    if (newvalue) {
      setValue(newvalue);
    }
    async function FetchData() {
      const token = await localStorage.getItem('accessToken');
      axios
        .get('http://localhost:4000/api/division/view_division', { headers: { authToken: token } })
        .then((res) => {
          console.log(res.data);
          setDivsn(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    FetchData();
  }, []);

  const [value, setValue] = useState('64b63271e4c71dfecf988dd8'); // Initialize value with the first tab value

  const tabsData = divsn.map((division) => ({
    label: division?.d_name,
    value: division?._id,
    component: division.name // Assuming you have a "component" property in your "divsn" array
  }));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('batchtab', newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabsData.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>

        {tabsData.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {
              tab.label === 'Cognitive Solution' ? (
                <CognitiveBatches propid={tab.value} />
              ) : tab.label === 'QueueTech Solution' ? (
                <QuetechBatches propid={tab.value} />
              ) : tab.label === 'CodeLab Systems' ? (
                <CodelabBatches propid={tab.value} />
              ) : null // Handle cases when no matching component is found
            }
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
