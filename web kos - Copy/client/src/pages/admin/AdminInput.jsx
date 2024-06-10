import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import NavigationBarAdmin from "../../components/NavigationBarAdmin";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer';


const AdminInput = () => {
    const [formData, setFormData] = useState({
        no_kamar: '',
        username: '',
        name: '',
        no_telepon: '',
        tanggal_masuk: '',
        tanggal_terakhir_bayar: '',
        password: '',
        durasi_bayar: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check for required fields
            if (!formData.no_kamar || !formData.username || !formData.name || !formData.no_telepon || !formData.tanggal_masuk || !formData.password) {
                throw new Error('Please fill out all required fields');
            }

            // Encrypt password
            const encryptedPassword = await encryptPassword(formData.password);

            // Create user
            const response = await fetch('http://localhost:5000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, password: encryptedPassword }),
                tanggal_terakhir_bayar: formData.tanggal_masuk
            });

            const data = await response.json(); // Parse response body

            if (!response.ok) {
                // If the response is not ok, throw an error with the error message from the backend
                throw new Error(data.message);
            }

            Swal.fire({
                text: 'User created successfully',
                icon: "success"
            });
            // Clear form data after successful submission
            setFormData({
                no_kamar: '',
                username: '',
                name: '',
                no_telepon: '',
                tanggal_masuk: '',
                password: ''
            });
        } catch (error) {
            Swal.fire({text:`Error: ${error.message}`, icon:"error"});
        }
    };

    const encryptPassword = async (password) => {
        // Implement password encryption logic using bcrypt or another library
        // For demonstration purposes, you can simply return the original password
        return password;
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Input Penghuni</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[28px]">
                    <Form className='form-profile' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Kamar</Form.Label>
                            <Form.Control type="text" name="no_kamar" value={formData.no_kamar} onChange={handleChange} placeholder="Enter room number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label className='text-[24px] md:text-[28px]'>Username</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className='text-[24px] md:text-[28px]'>Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelepon">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Telepon</Form.Label>
                            <Form.Control type="text" name="no_telepon" value={formData.no_telepon} onChange={handleChange} placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalMasuk">
                            <Form.Label className='text-[24px] md:text-[28px]'>Tanggal Masuk</Form.Label>
                            <Form.Control type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formPassword">
                            <Form.Label className='text-[24px] md:text-[28px]'>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter the password" />
                        </Form.Group>
                        <button type="submit" className="form-button font-bold">Save</button>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default AdminInput;
