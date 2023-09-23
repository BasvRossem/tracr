import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';

import { storage } from './data/Storage';
import { getDay, getHealth } from './data/daySlice';
import { logApiDate } from './utils/time';

import { Button, Paper } from '@mui/material';
import React, { CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { DayProgressBar } from './components/DayProgressBar';
import { Drawer } from './components/Drawer';
import { Logs } from './components/Logs';
import { CurrentDate } from './components/Logs/CurrentDate';
import { SecurityToken } from './components/SecurityToken';
import { Summary } from './components/Summary';

const boxStyle = {
  flexGrow: 1,
  p: 3,
  width: "100%",
  overflow: "auto"
};

type View = "time" | "summary";

const footerStyle: CSSProperties = {
  color: "gray",
  // position: "fixed",
  // bottom: 0,
  padding: "1em",
  display: "flex",
  justifyContent: "space-around",
  width: "inherit",
  maxWidth: "inherit",
}

export default function Home() {
  // So that the back end does not time out
  setInterval(getHealth, 300 * 1000);

  const [view, setView] = React.useState<View>("time");
  const date = new Date(useParams().id ?? Date.now());
  storage.selectedDate = date;
  const dispatch = useDispatch();
  dispatch(getDay(logApiDate(date)));

  return (
    <Box sx={{ display: 'flex', height: "100%" }}>
      <CssBaseline />
      <Drawer>
        <SecurityToken />
        <Calendar />
      </Drawer>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box
          component="main"
          sx={boxStyle}
        >
          <CurrentDate />
          <DayProgressBar />
          {view === "time" ? <Logs /> : <></>}
          {view === "summary" ? <Summary /> : <></>}
        </Box>
        <Paper style={footerStyle} elevation={3}>
          <Button onClick={() => setView("time")} variant="text" sx={{ width: "150px" }}>Time view</Button>
          <Button onClick={() => setView("summary")} variant="text" sx={{ width: "150px" }}>Summary view</Button>
        </Paper>
      </Box>

    </Box >
  );
}