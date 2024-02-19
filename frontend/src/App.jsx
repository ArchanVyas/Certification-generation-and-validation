import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import TemplateForm from './components/TemplateForm';
import Logout from './pages/logout';
import MyCerti from './pages/Mycerti';
import AdminSignup from './pages/adminSignup';
import AdminLogin from './pages/adminLogin';
import AdminDashboard from './pages/adminDashboard'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='admin/templateform' element={<TemplateForm />} />
          <Route path='/mycerti' element={<MyCerti />} />
          <Route path="/logout" component={<Logout/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
