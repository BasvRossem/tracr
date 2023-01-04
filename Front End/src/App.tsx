import { BrowserRouter as Router, Routes, Route,
  // Link
} from 'react-router-dom';
import Home from './Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/:id' element={< Home />}></Route>
      </Routes>
    </Router>
  );
}