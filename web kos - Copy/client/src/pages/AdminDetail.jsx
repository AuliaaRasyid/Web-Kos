
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const AdminDetail = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        no_kamar: '',
        name: '',
        no_telepon: '',
        tanggal_masuk: '',
        tanggal_terakhir_bayar: ''
    });
    const [setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                setError("Invalid ID");
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
                setError(error.message);
            }
        };

        fetchUserData();
    }, [id]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Detail Penghuni</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[28px]">
                    <Form className='form-profile' >
                        <Form.Group className="mb-3" controlId="formNoKamar">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Kamar</Form.Label>
                            <Form.Control
                                type="text"
                                name="no_kamar"
                                disabled
                                onChange={handleInput}
                                value={userData.no_kamar}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label className='text-[24px] md:text-[28px]'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                disabled
                                onChange={handleInput}
                                value={userData.name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelepon">
                            <Form.Label className='text-[24px] md:text-[28px]'>No Telepon</Form.Label>
                            <Form.Control
                                type="text"
                                name="no_telepon"
                                disabled
                                onChange={handleInput}
                                value={userData.no_telepon}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalMasuk">
                            <Form.Label className='text-[24px] md:text-[28px]'>Tanggal Masuk</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal_masuk"
                                disabled
                                onChange={handleInput}
                                value={userData.tanggal_masuk}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTanggalTerakhirBayar">
                            <Form.Label className='text-[24px] md:text-[28px]'>Tanggal Terakhir Bayar</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal_terakhir_bayar"
                                disabled
                                onChange={handleInput}
                                value={userData.tanggal_terakhir_bayar}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </main>
            <footer>
                <p>footer by group lmao 32</p>
            </footer>
        </div>
    );
};

export default AdminDetail;
