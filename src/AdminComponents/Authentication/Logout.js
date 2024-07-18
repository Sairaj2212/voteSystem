// src/AdminComponents/Authentication/Logout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Alert } from 'react-bootstrap';

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(true);
    const navigate = useNavigate();
    const logout = fetch('http://localhost/vote_server/logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await logout;

                const data = await response.json();

                if (response.ok && data.success) {
                    localStorage.removeItem('authToken');
                    setMessage(data.message || 'Logout successful');
                    setSuccess(true);
                } else {
                    setMessage(data.message || 'Logout failed');
                    setSuccess(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred during logout');
                setSuccess(false);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Redirect after 2 seconds
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Alert variant={success ? 'success' : 'danger'}>
                        {message}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default Logout;
