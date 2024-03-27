import React, { useState } from 'react';
import { useSelector } from "react-redux";

import '../index.css';

function UserEdit({ isOpen, onClose, user, onUpdate }) {
    const { users } = useSelector((state) => state.adminAuth);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        validateName(newName);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const validateName = (value) => {
        if (!value.trim()) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            setEmailError('Email is required');
        } else if (!emailRegex.test(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setNameError('Name is required');
            return;
        }
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }
        if (nameError || emailError) {
            return;
        }
    
        if (email === user.email) {
            onUpdate({ id: user._id, name, email });
            onClose();
        } else {
            const emailExists = users.some(u => u.email === email);
            if (emailExists) {
                setEmailError('Email already exists, try again with another email');
            } else {
                onUpdate({ id: user._id, name, email });
                onClose();
            }
        }
    };
    
    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" style={{ fontSize: "50px", cursor: 'pointer' }} onClick={onClose}>&times;</span>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} onChange={handleNameChange} />
                                {nameError && <div className="error" style={{color:'red'}}>{nameError}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={handleEmailChange} />
                                {emailError && <div className="error"  style={{color:'red'}} >{emailError}</div>}
                            </div>
                            <button className='btn' type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserEdit;
