import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// importing the components
import Header from './components/Header';
// importing the pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

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
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
