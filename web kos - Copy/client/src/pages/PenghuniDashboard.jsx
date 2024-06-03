import NavigationBarPenghuni from '../components/NavigationBarPenghuni';
import './styles/adminPenghuni.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PenghuniDashboard = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        no_kamar: '',
        tanggal_terakhir_bayar: ''
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

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarPenghuni />
            </header>
            <main className="mainContent pb-4">
                <div>
                    <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4">Deadline: 24-08-2024</h1>
                    <div className="table__penghuni px-3 md:px-5 text-[20px]">
                        <table className="custom-table">
                            <thead>
                                <tr className="text-center">
                                    <th>No.Kamar</th>
                                    <th>Tgl Bayar <br />Terakhir</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td>{userData.no_kamar}</td>
                                    <td>{userData.tanggal_terakhir_bayar}</td>
                                    <td className="aksi">
                                        <div className="button-group">
                                            <button className="aksi-button">Bayar</button>
                                            <Link to={`/PenghuniKeluhan/${userData._id}`}>
                                                <button className="aksi-button">Keluhan</button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <section className="contact">
                        <div className="kosan__contact text-[44px] flex flex-col items-center pt-20 p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Contact</h1>
                            <p className="pb-10 text-[32px] text-center">Kontak untuk pertanyaan lebih lanjut silakan hubungi</p>
                            <div className="contact__container">
                                <p className="contact__title text-[28px] md:text-[44px] font-bold">Rusdi Awamalum</p>
                                <p className="contact__subtitle text-[28px] md:text-[40px]">owner</p>
                                <div className="contact__button">
                                    <button className="phone-button">087731366528</button>
                                    <button className="whatsapp-button"><i className="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer>
                <p>footer by group lmao 32</p>
            </footer>
        </div>
    );
};

export default PenghuniDashboard;
