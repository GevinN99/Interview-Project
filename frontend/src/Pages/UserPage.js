import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row, Table, Pagination } from 'react-bootstrap';
import '../App.css';
import Navbar from "../Components/Navbar/Navbar";
import { MdDelete } from "react-icons/md";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState({ name: '', email: '', id: '' });
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [usersPerPage] = useState(8);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchParams]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:8070/api/users/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } else {
                console.error('Failed to fetch users data');
                setErrorMessage('Failed to fetch users data');
            }
        } catch (error) {
            console.error('Error fetching users data:', error);
            setErrorMessage('Error fetching users data');
        }
    };

    const handleViewUser = (userId) => {
        const user = users.find(user => user._id === userId);
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8070/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
                    },
                });
                if (response.ok) {
                    console.log('User deleted successfully');
                    setSuccessMessage('User deleted successfully');
                    fetchUsers();
                } else {
                    console.error('Failed to delete user');
                    setErrorMessage('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setErrorMessage('Error deleting user');
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSearch = () => {
        const { name, email, id } = searchParams;
        let tempUsers = [...users];

        if (name) {
            tempUsers = tempUsers.filter(user => user.firstName.toLowerCase().includes(name.toLowerCase()));
        }
        if (email) {
            tempUsers = tempUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
        }
        if (id) {
            tempUsers = tempUsers.filter(user => user.nic.toLowerCase().includes(id.toLowerCase()));
        }

        setFilteredUsers(tempUsers);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar/>
            <Container fluid style={{ marginTop: '80px' }}>
                {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

                <Row>
                    <Col>
                        <Form>
                            <Row>
                                <Col xs={12} sm={4}>
                                    <Form.Control className="mb-2" type="text" placeholder="Search by name" value={searchParams.name} onChange={e => setSearchParams(prevState => ({ ...prevState, name: e.target.value }))} />
                                </Col>
                                <Col xs={12} sm={4}>
                                    <Form.Control className="mb-2" type="text" placeholder="Search by email" value={searchParams.email} onChange={e => setSearchParams(prevState => ({ ...prevState, email: e.target.value }))} />
                                </Col>
                                <Col xs={12} sm={4}>
                                    <Form.Control className="mb-2" type="text" placeholder="Search by ID" value={searchParams.id} onChange={e => setSearchParams(prevState => ({ ...prevState, id: e.target.value }))} />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="text-center">
                            <tr>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>NIC</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.nic}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Button className="mx-3" variant="outline-dark" size="sm"
                                                    onClick={() => handleViewUser(user._id)}>
                                                View
                                            </Button>
                                            <Button variant="outline-danger" size="sm"
                                                    onClick={() => handleDeleteUser(user._id)}>
                                                <MdDelete className="fs-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        <Pagination className="justify-content-center">
                            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                                <Pagination.Item
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    active={i + 1 === currentPage}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                                    <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p><strong>Mobile Number:</strong> {selectedUser.mobileNumber}</p>
                                    <p><strong>User Type:</strong> {selectedUser.userType}</p>
                                    <p><strong>NIC:</strong> {selectedUser.nic}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p><strong>Address:</strong> {selectedUser.address}</p>
                                    <p><strong>Bio:</strong> {selectedUser.bio}</p>
                                    <p><strong>Job:</strong> {selectedUser.job}</p>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserPage;
