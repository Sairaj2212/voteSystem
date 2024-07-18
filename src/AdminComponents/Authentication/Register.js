import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth_css/Register.css'; // Import your custom CSS file
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    setSuccessMessage('');

    // Validate inputs
    if (!username || !password || !confirmPassword || !email) {
      newErrors.push('All fields are required.');
    }
    if (!/^[a-z0-9]+$/.test(username)) {
      newErrors.push('Username must contain only lowercase letters and numbers.');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push('Invalid email format.');
    }
    if (password !== confirmPassword) {
      newErrors.push('Passwords do not match.');
    }
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[@$!%*?&]/.test(password)) {
      newErrors.push('Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors([]), 2000);
      return;
    }

    try {
      const response = await fetch('http://51.21.62.160/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          email
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Registration successful');
        // Clear form fields
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');

        // Redirect to login page after successful registration
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErrors([result.message || 'Registration failed']);
        setTimeout(() => setErrors([]), 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['Registration failed']);
      setTimeout(() => setErrors([]), 2000);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Register</h2>

            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success">
                {successMessage}
              </div>
            )}

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="password-container">
                <Form.Control
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-toggle"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Register
            </Button>
            <Button variant="link" className="w-100 mt-3" onClick={handleLoginClick}>
                Back to login
              </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
