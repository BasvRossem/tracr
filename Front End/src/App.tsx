import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Calendar } from './components/Calendar';
import { LogList } from './components/LogList';
import { DayProgressBar } from './components/DayProgressBar';
import { Summary } from './components/Summary';
import { Drawer } from './components/Drawer';
import { useDispatch } from 'react-redux';
import { logApiDate } from './utils/time';
import { getLogs } from './data/logSlice';

const boxStyle = { 
  flexGrow: 1, 
  p: 3 
};

function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}

export default function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const dispatch = useDispatch();
  dispatch(getLogs(logApiDate(new Date())));
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer collapseable={windowDimensions.width < 900}>
        <Calendar />
        <DayProgressBar />
        <Summary />
      </Drawer>

      <Box
        component="main"
        sx={boxStyle}
      >
        <LogList />
      </Box>
    </Box>
  );
}