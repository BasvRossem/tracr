import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Calendar } from './components/Calendar';
import { LogList } from './components/LogList';
import { DayProgressBar } from './components/DayProgressBar';

const drawerWidth = 400;

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Calendar />
        <DayProgressBar />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <div style={{ width: '100%' }}>
        
        <LogList />
        </div>
      </Box>
    </Box>
  );
}