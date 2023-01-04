import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { logApiDate } from './utils/time';
import { getHealth, getLogs } from './data/logSlice';
import { Storage } from './data/Storage';

import { Calendar } from './components/Calendar';
import { Logs } from './components/Logs';
import { DayProgressBar } from './components/DayProgressBar';
import { Summary } from './components/Summary';
import { Drawer } from './components/Drawer';
import { SecurityToken } from './components/SecurityToken';
import { useParams } from 'react-router-dom';

const boxStyle = {
    flexGrow: 1,
    p: 3
};

function getWindowDimensions() {
    return { width: window.innerWidth, height: window.innerHeight };
}

export default function Home(props: any) {
    // So that the back end does not time out
    setInterval(getHealth, 300 * 1000);

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const dispatch = useDispatch();

    const date = new Date(useParams().id ?? Date.now());
    Storage.getInstance().selectedDate = date;
    console.log("getting logs")
    dispatch(getLogs(logApiDate(date)));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer collapsible={windowDimensions.height > windowDimensions.width}>
                <SecurityToken />
                <Calendar />
                <DayProgressBar />
                <Summary />
            </Drawer>

            <Box
                component="main"
                sx={boxStyle}
            >
                <Logs />
            </Box>
        </Box>
    );
}