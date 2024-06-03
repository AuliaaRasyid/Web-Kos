import { Link } from 'react-router-dom';
import NavigationBarAdmin from "../components/NavigationBarAdmin";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setUsers(users.filter(user => user._id !== userId));
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } else {
                    Swal.fire("Error!", "Error deleting user.", "error");
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire("Error!", "Error deleting user.", "error");
            }
        }
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <div>
                    <h1 className="text-[30px] md:text-[44px] p-6 md:p-10 pb-4 font-bold">Info Penghuni</h1>
                    <div className='input__section flex flex-row items-center'>
                        <a href='adminInput'>
                            <button className="input-button">Input</button>
                        </a>
                        <div className="radio-buttons flex gap-3 md:gap-8 text-[22px] md:text-[32px]">
                            <label>
                                <input
                                    type="radio"
                                    name="availability"
                                    value="Available"
                                />
                                Available
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="availability"
                                    value="Unavailable"
                                />
                                Unavailable
                            </label>
                        </div>
                    </div>
                    <div className='table__penghuni px-3 md:px-5 text-[20px]'>
                        <table className="custom-table">
                            <thead>
                                <tr className='text-center'>
                                    <th>No.Kamar</th>
                                    <th>Nama</th>
                                    <th>Tgl Masuk</th>
                                    <th>Tgl Bayar <br />Terakhir</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.no_kamar}</td>
                                        <td>{user.name}</td>
                                        <td>{new Date(user.tanggal_masuk).toLocaleDateString()}</td>
                                        <td>{new Date(user.tanggal_terakhir_bayar).toLocaleDateString()}</td>
                                        <td className='aksi'>
                                            <div className="button-group">
                                                <Link to={`/AdminDetail/${user._id}`}>
                                                    <button className="aksi-button">Detail</button>
                                                </Link>
                                                <Link to={`/AdminEdit/${user._id}`}>
                                                    <button className="aksi-button">Edit</button>
                                                </Link>
                                                <button className="aksi-button" onClick={() => deleteUser(user._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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

export default AdminDashboard;
