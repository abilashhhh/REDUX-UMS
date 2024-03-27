import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div>
      {user ? (
        <>
          <h3>Dashboard of</h3>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </>
      ) : <h2>User dashboard page</h2>}
    </div>
  )
}

export default Dashboard
