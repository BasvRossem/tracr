import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Calendar } from './components/Calendar';
import { LogList } from './components/LogList';
import { DayProgressBar } from './components/DayProgressBar';
import { Summary } from './components/Summary';

const drawerStyle = {
  width: 400,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 400,
    boxSizing: 'border-box'
  }
};
const boxStyle = { 
  flexGrow: 1, 
  p: 3 
};

export default function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer
        sx={drawerStyle}
        variant="permanent"
        anchor="left"
      >
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