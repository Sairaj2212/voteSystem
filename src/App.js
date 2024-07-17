// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './AdminComponents/Authentication/Login';
import Register from './AdminComponents/Authentication/Register';
import Logout from './AdminComponents/Authentication/Logout';
import RequestDetails from './AdminComponents/RequestDetails';
import MP from './AdminComponents/MPCandidates';
import MLA from './AdminComponents/MLACandidates';
import VoteCasting from './AdminComponents/VoteCasting';
import Results from './AdminComponents/Results';
import DynamicSlot from './AdminComponents/DynamicSlot';
import ProtectedRoute from './AdminComponents/Authentication/ProtectedRoute';
import VerticalMenu from './AdminComponents/VerticalMenu';

const App = () => {
    useEffect(() => {
        const noBack = () => {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = () => {
                window.history.go(1);
            };
        };

        noBack();

        // Cleanup function to remove history manipulation on unmount
        return () => {
            window.onpopstate = null;
        };
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Perform logout
            fetch('http://localhost/vote_server/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.removeItem('authToken');
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <Router>
            <div className="app">
                <div className="main">
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/request-details" element={<ProtectedRoute element={RequestDetails} />} />
                            <Route path="/mp" element={<ProtectedRoute element={MP} />} />
                            <Route path="/mla" element={<ProtectedRoute element={MLA} />} />
                            <Route path="/vote-casting" element={<ProtectedRoute element={VoteCasting} />} />
                            <Route path="/results" element={<ProtectedRoute element={Results} />} />
                            <Route path="/dynamic-slot" element={<ProtectedRoute element={DynamicSlot} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
