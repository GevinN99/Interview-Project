import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8070/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                const { token } = data;
                localStorage.setItem('auth-token', token);
                setSuccessMessage('Login successful. Redirecting...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            } else {
                setErrorMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Container className="login-container mt-5">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Row className="justify-content-center mt-5">
                <Col md={6} className="login-form mt-5">
                    <h2 className="text-center mb-4">Login</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                            />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleLogin} className="login-button">
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <Link to="/signup" className="text-decoration-none">Create one</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
