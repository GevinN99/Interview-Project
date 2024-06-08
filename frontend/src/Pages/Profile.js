import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Navbar from '../Components/Navbar/Navbar';
import { CgProfile } from 'react-icons/cg';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        userType: '',
        nic: '',
        address: '',
        bio: '',
        job: '',
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        nic: '',
        job: '',
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/users/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                setFormData(data);
            } else {
                console.error('Failed to fetch profile data');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const handleUpdateProfile = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormErrors({
                ...formErrors,
                email: 'Invalid email format',
            });
            return;
        }

        const nameRegex = /^[a-zA-Z\s]{1,15}$/;
        if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName) || !nameRegex.test(formData.job)) {
            setFormErrors({
                ...formErrors,
                firstName: 'Invalid name format (max 15 characters, no numbers)',
                lastName: 'Invalid name format (max 15 characters, no numbers)',
                job: 'Invalid job format (max 15 characters, no numbers)',
            });
            return;
        }

        const mobileNumberRegex = /^[0-9\+\s]{1,15}$/;
        if (!mobileNumberRegex.test(formData.mobileNumber)) {
            setFormErrors({
                ...formErrors,
                mobileNumber: 'Invalid mobile number format',
            });
            return;
        }

        const nicRegex = /^[2][0-9]{12}$/;
        const nicRegexWithV = /^[0-9]{9}[vV]$/;
        if (formData.nic.charAt(9).toLowerCase() !== 'v') {
            if (formData.nic.charAt(0) !== '2' || !nicRegex.test(formData.nic)) {
                setFormErrors({
                    ...formErrors,
                    nic: 'Invalid NIC format',
                });
                return;
            }
        } else {
            if (!nicRegexWithV.test(formData.nic)) {
                setFormErrors({
                    ...formErrors,
                    nic: 'Invalid NIC format',
                });
                return;
            }
        }

        try {
            const response = await fetch('http://localhost:8070/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                handleCloseModal();
                fetchProfileData();
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Container className="profile-container my-5">
                <div className="profile-header text-center mb-4">
                    <h1 className="profile-title">
                        <CgProfile className="profile-icon" style={{ fontSize: '80px', marginTop: '30px' }} />
                        <br />
                        {profileData && (
                            <span className="profile-name">
                                {`${profileData.firstName} ${profileData.lastName}`}
                            </span>
                        )}
                    </h1>
                </div>
                {profileData && (
                    <Row className="justify-content-center">
                        <Col xs={12} md={8}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col className="text-center">
                                            <div className="profile-details mb-2">
                                                <strong>Email:</strong> {profileData.email}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>Mobile Number:</strong> {profileData.mobileNumber}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>User Type:</strong> {profileData.userType}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>NIC:</strong> {profileData.nic}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>Address:</strong> {profileData.address}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>Bio:</strong> {profileData.bio}
                                            </div>
                                            <div className="profile-details mb-2">
                                                <strong>Job:</strong> {profileData.job}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="dark" onClick={handleShowModal}>
                                    Update Profile
                                </Button>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                            {formErrors.firstName && <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                            {formErrors.lastName && <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
                            {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formMobileNumber" className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter mobile number" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                            {formErrors.mobileNumber && <Form.Text className="text-danger">{formErrors.mobileNumber}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formNIC" className="mb-3">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control type="text" placeholder="Enter NIC" name="nic" value={formData.nic} onChange={handleInputChange} />
                            {formErrors.nic && <Form.Text className="text-danger">{formErrors.nic}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBio" className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter bio" name="bio" value={formData.bio} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formJob" className="mb-3">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="Enter job" name="job" value={formData.job} onChange={handleInputChange} />
                            {formErrors.job && <Form.Text className="text-danger">{formErrors.job}</Form.Text>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProfile}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Profile;

