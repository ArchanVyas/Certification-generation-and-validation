import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
