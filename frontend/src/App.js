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
import Profile from "../src/pages/Profile"
import EditProfile from './pages/EditProfile';
import AddData from './components/addData';
import UserDashboardTable from './components/UserDashboardTable';
import Validate from './components/Validate';
import SearchCerti from './pages/SearchCerti';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/' element={<Login />} />
          <Route path='logout/' element={<Logout />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/validate' element={<Validate />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/request' element={<UserDashboardTable />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='admin/templateform' element={<TemplateForm />} />
          <Route path='admin/course' element={<AddData />} />
          <Route path='/mycerti' element={<MyCerti />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/search-certificate" element={<SearchCerti />}/>
          <Route path="/edit-profile" element={<EditProfile/>} />
          <Route path="/logout" component={<Logout/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
