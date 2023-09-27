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
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function LabTabs() {
  const [value, setValue] = useState('all');
  const [divsn1, setDivsn1] = useState(['All']);
  const [divsn, setDivsn] = useState([]);

  useEffect(() => {
    // Make the API request
    const newValue=localStorage.getItem("studentTab")
    if(newValue){
      setValue(newValue);

    }
   

    async function FetchData(){
      const token=await localStorage.getItem("accessToken")
      console.log("token",token)
      axios
        .get('http://localhost:4000/api/division/view_division',{headers:{"authToken":token}})
        .then((res) => {
          console.log("res",res.data);
          setDivsn(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    }
    FetchData()
   
  }, []);
  const handleChange = (event, newValue) => {
    // alert(newValue);
    setValue(newValue);
    localStorage.setItem("studentTab",newValue)
  };
  const allDataTab = {
    label: 'All',
    value: 'all',
    component: <StudentAll divsn1={divsn1} />
  };

  const tabsData = [
    allDataTab,
    ...divsn.map((division) => ({
      label: division.d_name,
      value: division.d_name,
      component: <StudentAll props={division.d_name} />
    }))
  ];

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
