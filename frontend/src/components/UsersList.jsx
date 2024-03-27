import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockUser, getUsers, reset, editUser } from "../features/adminAuth/adminAuthSlice";
import { useNavigate } from 'react-router-dom'
import React from "react";
import UserEdit from "./UserEdit";
import Spinner from "./Spinner";
import { toast } from 'react-toastify';

function UsersList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, isLoading, isError, message } = useSelector((state) => state.adminAuth)
    const [selectedUser, setSelectedUser] = useState(null);
    const [EditOpen, setEditOpen] = useState(false);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const updateUser = (updatedUser) => {
        dispatch(editUser(updatedUser)).then(() => {
            dispatch(getUsers());
            handleEditClose();
        });
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getUsers());
    }, [message]);

    const handleBlock = (userId) => {
        if (window.confirm(`Are you sure?`)) {
            dispatch(blockUser(userId)).then(() => dispatch(getUsers()))
        }
    }

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            {isLoading && <Spinner />}
            {users ? (
                <>
                    <input className="search-bar"
                        type="text"
                        placeholder="Search User"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DP</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length ? filteredUsers.map((user, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="profile-image">
                                                <img src={user.image_url ? user.image_url : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="" />
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_active ? "Active" : "Blocked"}</td>
                                        <td >
                                            <div className="action-btn-container">
                                                <button className="action-btn edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                                                <button className="action-btn block-btn" onClick={() => handleBlock(user._id)}>{user.is_active ? 'Block' : 'Unblock'}</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {EditOpen && selectedUser && selectedUser._id === user._id && (
                                        <tr>
                                            <td colSpan="6">
                                                <UserEdit
                                                    isOpen={EditOpen}
                                                    onClose={handleEditClose}
                                                    user={selectedUser}
                                                    onUpdate={updateUser}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )) : <tr><td colSpan="6">No Users found</td></tr>}
                        </tbody>
                    </table>
                </>

            ) : <h1>No Users Found</h1>}
        </>
    )
}

export default UsersList;
