import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBarAdmin from '../components/NavigationBarAdmin';
import "./styles/adminPenghuni.css"; // Adjust this import based on your actual file structure

const AdminKeluhanDetail = () => {
    const { userId, complaintId } = useParams();
    const [complaintDetails, setComplaintDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}/complaints/${complaintId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComplaintDetails(data);
            } catch (error) {
                console.error('Error fetching complaint details:', error);
                setError(error.message);
            }
        };
        fetchComplaintDetails();
    }, [userId, complaintId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Keluhan</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[24px]">
                    <Form className='form-profile'>
                        <Form.Group className="mb-3" controlId="formNoKamar">
                            <Form.Label>No Kamar</Form.Label>
                            <Form.Control
                                type="text"
                                name='no_kamar'
                                value={complaintDetails.no_kamar || ''}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                value={complaintDetails.name || ''}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formKeluhan">
                            <Form.Label>Keluhan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='keluhan'
                                value={complaintDetails.keluhan || ''}
                                disabled
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

export default AdminKeluhanDetail;
