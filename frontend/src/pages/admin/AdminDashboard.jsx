import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from '../../features/adminAuth/adminAuthSlice';
import UsersList from "../../components/UsersList";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.adminAuth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/admin');
    };

    const addUser = () => {
        navigate('/admin/addUser');
    };

    useEffect(() => {
        if (!admin) {
            navigate('/admin/login');
        }
    }, [admin, navigate]);

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-buttons">
                <button className="btn" onClick={addUser}>Add User</button>
                <button className="btn" onClick={onLogout}>Logout</button>
            </div>

            <UsersList />
        </div>
    );
}

export default Dashboard;
