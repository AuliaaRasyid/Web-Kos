import { useEffect, useState } from 'react';
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import './styles/adminPenghuni.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AdminKeluhan = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    const deleteComplaint = async (userId, complaintId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}/complaints/${complaintId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    Swal.fire(`HTTP error! status: ${response.status}`, "error");
                }

                // Fetch the updated list of complaints after deletion
                const updatedResponse = await fetch('http://localhost:5000/api/complaints');
                if (!updatedResponse.ok) {
                    Swal.fire(`HTTP error! status: ${updatedResponse.status}`, "error");
                }
                Swal.fire("Deleted!", "Complaint has been deleted.", "success");
                const updatedData = await updatedResponse.json();

                // Set the state with the updated complaints data
                setComplaints(updatedData);
            } catch (error) {
                Swal.fire('Error deleting complaint:', error);
            }
        }
    };
    const limitText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <div>
                    <h1 className="text-[30px] md:text-[44px] p-6 md:p-10 pb-4 font-bold">Keluhan Penghuni</h1>
                    <div className='table__penghuni px-3 md:px-5 text-[20px]'>
                        <table className="custom-table">
                            <thead>
                                <tr className='text-center'>
                                    <th className='max-w-10 md:max-w-32'>No.Kamar</th>
                                    <th>Nama</th>
                                    <th>Keluhan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {complaints.map(user => user.keluhan.map(complaint => (
                                    <tr key={complaint._id}>
                                        <td>{user.no_kamar}</td>
                                        <td>{user.name}</td>
                                        <td className='max-w-14 md:max-w-32'>{limitText(complaint.keluhan, 100)}</td>
                                        <td className='aksi max-w-[48px] md:max-w-32'>
                                            <div className="button-group">
                                                <Link to={`/AdminKeluhanDetail/${user._id}/${complaint._id}`}>
                                                    <button className="aksi-button">Detail</button>
                                                </Link>
                                                <button className="aksi-button" onClick={() => deleteComplaint(user._id, complaint._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <footer>
                <p>footer by group lmao 32</p>
            </footer>
        </div>
    );
};

export default AdminKeluhan;
