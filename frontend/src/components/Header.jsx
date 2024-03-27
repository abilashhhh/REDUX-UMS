import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log(user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  } 

  const goToUserProfile=()=>{
    navigate('/userProfile')
}

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>UMS System</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
             
            <button className='btn' onClick={goToUserProfile}>
             <FaUser/> <p  className='name'>{user.name}</p>
             </button>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li></>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}


export default Header
