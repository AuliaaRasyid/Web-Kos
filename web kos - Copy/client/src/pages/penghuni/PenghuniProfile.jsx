import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { } from "../styles/adminPenghuni.css"
import NavigationBarPenghuni from '../../components/NavigationBarPenghuni';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { API_URL } from '../../utils/constant';


const PenghuniProfile = () => {
    const navigateTo = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        password: '',
    });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                Swal.fire("Invalid ID");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                Swal.fire(error.message);
            }
        };

        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: 'Are you sure you want to change the password?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/users/${id}/change-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ oldPassword, newPassword, userData })
                });
                const data = await response.json(); // Parse response body

                if (response.ok) {
                    Swal.fire('User data updated successfully', '', 'success');
                    navigateTo(`/PenghuniDashboard/${userData._id}`);

                } else {
                    throw new Error(data.message);
                }

            } catch (error) {
                Swal.fire(error.message, '', 'error');
            }
        }
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarPenghuni />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Profile</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[24px]">
                    <Form className='form-profile' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                value={userData.name}
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formOldPassword">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="oldPassword"
                                placeholder="Enter your old password"
                                onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Enter your new password"
                                onChange={handleInputChange} />
                        </Form.Group>
                        <button className="form-button">Save</button>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default PenghuniProfile;
