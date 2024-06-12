
import NavigationBarAdmin from "../../components/NavigationBarAdmin";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import Footer from '../../components/Footer';
import { dateUtils } from '../../utils/dateUtils';
import { API_URL } from '../../utils/constant';


const AdminDetail = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        no_kamar: '',
        username: '',
        name: '',
        no_telepon: '',
        tanggal_masuk: '',
        tanggal_terakhir_bayar: '',
        durasi_bayar: 1
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                Swal.fire("Invalid ID", "error");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                // Format dates before setting the state
                data.tanggal_masuk = dateUtils(data.tanggal_masuk);
                data.tanggal_terakhir_bayar = dateUtils(data.tanggal_terakhir_bayar);
                setUserData(data);
            } catch (error) {
                Swal.fire(error.message, "error");
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
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label className='text-[24px] md:text-[28px]'>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                disabled
                                onChange={handleInput}
                                value={userData.username}
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
                        <Form.Group className="mb-3" controlId="formDurasi_bayarr">
                            <Form.Label className='text-[24px] md:text-[28px]'>Durasi Bayar</Form.Label>
                            <Form.Control
                                type="text"
                                name="durasi_bayar"
                                disabled
                                onChange={handleInput}
                                value={userData.durasi_bayar + ' Bulan'}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDetail;
