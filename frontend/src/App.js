import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// importing the components
import Header from './components/Header';
// importing the pages
import Dashboard from './pages/user/Dashboard';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AddUser from './components/AddUser';
function App() {
  return (
    <>
      <Router>
        <div className='container'>

          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/register' element={<Register />} ></Route>
            <Route path='/userProfile' element={<Profile />} />

            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/addUser' element={<AddUser />} />


          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
