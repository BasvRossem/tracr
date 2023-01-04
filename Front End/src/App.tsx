import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Settings from './pages/Settings';
import TicketSettings from './pages/Tickets';


export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path='/logs/:id' element={< Home />}></Route>
        <Route path="/settings" element={< Settings />}>
          <Route index path="tickets" element={< TicketSettings />}></Route>
        </Route>
        <Route path="*" element={< Home />}></Route>
      </Routes>
    </Router>
  );
}