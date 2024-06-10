import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBarAdmin from "../../components/NavigationBarAdmin";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

// Function to format date to yyyy-MM-dd
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const AdminEdit = () => {
    const navigateTo = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
        no_kamar: '',
        name: '',
        no_telepon: '',
        tanggal_masuk: '',
        tanggal_terakhir_bayar: '',
        durasi_bayar: ''
    });
    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                Swal.fire("Invalid ID");
                return;
            }
            try {

                const response = await fetch(`http://localhost:5000/api/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                // Format dates before setting the state
                data.tanggal_masuk = formatDate(data.tanggal_masuk);
                data.tanggal_terakhir_bayar = formatDate(data.tanggal_terakhir_bayar);
                setUserData(data);
            } catch (error) {
                Swal.fire(error.message);
            }
        };

        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure you want to change the data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                const data = await response.json(); // Parse response body

                if (response.ok) {
                    Swal.fire('User data updated successfully', '', 'success');
                } else {
                    throw new Error(data.message);
                }
            navigateTo('/AdminDashboard')
            } catch (error) {
                Swal.fire({ text: `Error: ${error.message}`, icon: "error" });
            }
        }
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Edit Penghuni</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[28px]">
                    <Form className='form-profile' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNoKamar">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Kamar</Form.Label>
                            <Form.Control
                                type="text"
                                name="no_kamar"
                                value={userData.no_kamar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className='text-[24px] md:text-[28px]'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelepon">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Telepon</Form.Label>
                            <Form.Control
                                type="text"
                                name="no_telepon"
                                value={userData.no_telepon}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalMasuk">
                            <Form.Label className='text-[24px] md:text-[28px]'>Tanggal Masuk</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal_masuk"
                                value={userData.tanggal_masuk}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalTerakhirBayar">
                            <Form.Label className='text-[24px] md:text-[28px]'>Tanggal Terakhir Bayar</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal_terakhir_bayar"
                                value={userData.tanggal_terakhir_bayar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label className='text-[24px] md:text-[28px]'>Durasi Bayar</Form.Label>
                            <Form.Control
                                type="number"
                                name="durasi_bayar"
                                value={userData.durasi_bayar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <button type="submit" className="form-button font-bold">Save</button>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default AdminEdit;
