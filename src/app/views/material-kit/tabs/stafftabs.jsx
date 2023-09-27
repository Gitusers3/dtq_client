import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StudentAll from '../tables/StudentAll';
import StaffAll from '../tables/StaffsAll';
import StudentQt from '../tables/StudentQt';
import StudentCd from '../tables/StudentCd';
import StudentCq from '../tables/StudentCq';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function LabTabs() {
  const [value, setValue] = useState('all');
  const [dv, setDv] = useState('all');
  const [divsn1, setDivsn1] = useState(['IT Operation']);
  const handleChange = (event, newValue) => {
    // alert(newValue);
    setValue(newValue);
    localStorage.setItem("staffTab",newValue)
  };
  useEffect(()=>{
    const newValue=localStorage.getItem("staffTab")
    if(newValue){
      setValue(newValue)
    }

  },[])

  const allDataTab = {
    label: 'All',
    value: 'all',
    component: <StaffAll all={dv} />
  };
  const It = {
    label: 'Techies',
    value: 'IT Operation',
    component: <StaffAll it={divsn1} />
  };

  const tabsData = [allDataTab, It];

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
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
