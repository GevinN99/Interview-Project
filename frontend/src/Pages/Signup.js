import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import '../App.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        nic: '',
        address: '',
        bio: '',
        job: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
        setErrorMessage('');
    };

    const handleSignup = async () => {
        const { email, password, firstName, lastName, mobileNumber, nic, address, bio, job } = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormErrors({
                ...formErrors,
                email: 'Please enter a valid email address.',
            });
            return;
        }

        if (password.length < 6) {
            setFormErrors({
                ...formErrors,
                password: 'Password must be at least 6 characters long.',
            });
            return;
        }

        const nameRegex = /^[a-zA-Z\s]{1,15}$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName) || !nameRegex.test(job)) {
            setFormErrors({
                ...formErrors,
                firstName: !nameRegex.test(firstName) ? 'Invalid name format (max 15 characters, no numbers)' : '',
                lastName: !nameRegex.test(lastName) ? 'Invalid name format (max 15 characters, no numbers)' : '',
                job: !nameRegex.test(job) ? 'Invalid job format (max 15 characters, no numbers)' : ''
            });
            return;
        }

        const mobileNumberRegex = /^[0-9\+\s]{10,15}$/;
        if (!mobileNumberRegex.test(mobileNumber)) {
            setFormErrors({
                ...formErrors,
                mobileNumber: 'Invalid mobile number format',
            });
            return;
        }

        const nicRegex = /^[2][0-9]{11}$/;
        const nicRegexWithV = /^[0-9]{9}[vV]$/;
        if (nic.charAt(9).toLowerCase() !== 'v') {
            if (nic.charAt(0) !== '2' || !nicRegex.test(nic)) {
                setFormErrors({
                    ...formErrors,
                    nic: 'Invalid NIC format',
                });
                return;
            }
        } else {
            if (!nicRegexWithV.test(nic)) {
                setFormErrors({
                    ...formErrors,
                    nic: 'Invalid NIC format',
                });
                return;
            }
        }

        try {
            const response = await fetch('http://localhost:8070/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, firstName, lastName, mobileNumber, nic, address, bio, job })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Signup successful. Redirecting to login...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 500);
            } else {
                setErrorMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <Container className="signup-container">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Row className="justify-content-center">
                <Col md={6} className="signup-form mt-5">
                    <h2 className="text-center mb-4">Signup</h2>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formMobileNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter mobile number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.mobileNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.mobileNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNic">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter NIC"
                                name="nic"
                                value={formData.nic}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.nic}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.nic}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.bio}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.bio}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formJob">
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job"
                                name="job"
                                value={formData.job}
                                onChange={handleChange}
                                className="input-field"
                                isInvalid={!!formErrors.job}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.job}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleSignup} className="signup-button">
                            Signup
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
