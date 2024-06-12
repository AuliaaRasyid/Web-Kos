import NavigationBarPenghuni from '../../components/NavigationBarPenghuni';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PopupBayar from '../../components/PopupBayar';
import { formatDate, addMonthsToDate } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constant';

const PenghuniDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userData, setUserData] = useState({
        no_kamar: '',
        tanggal_terakhir_bayar: '',
        durasi_bayar: 1 // Default to 1 month if not available
    });

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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handlePopup = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const deadline = userData.tanggal_terakhir_bayar
        ? formatDate(addMonthsToDate(userData.tanggal_terakhir_bayar, userData.durasi_bayar))
        : '';

    const copyNumber = () => {
        navigator.clipboard.writeText("087731366528");
        Swal.fire("Phone number copied to clipboard");
    }

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarPenghuni />
            </header>
            <main className="mainContent pb-4">
                <div>
                    <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4">Deadline: {deadline}</h1>
                    <div className="table__penghuni px-3 md:px-5 text-[20px]">
                        <table className="custom-table">
                            <thead>
                                <tr className="text-center">
                                    <th>No. Kamar</th>
                                    <th>Tgl Bayar <br />Terakhir</th>
                                    <th>Durasi Bayar</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td>{userData.no_kamar}</td>
                                    <td>{userData.tanggal_terakhir_bayar}</td>
                                    <td>{userData.durasi_bayar} Bulan</td>
                                    <td className="aksi">
                                        <div className="button-group">
                                            <button className="aksi-button" onClick={handlePopup}>Bayar</button>
                                            <button className="aksi-button" onClick={() => navigate(`/PenghuniKeluhan/${userData._id}`)}>Keluhan</button>
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
                                <p className="contact__subtitle">087731366528</p>
                                <div className="contact__button">
                                    <button className="phone-button" onClick={copyNumber}>Copy Number</button>
                                    <a href="https://wa.me/6287731366528" className="whatsapp-link">
                                        <button className="whatsapp-button"><i className="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {isPopupOpen && <PopupBayar userId={id} closePopup={closePopup} />}
            </main>
            <footer>
                <p>footer by group lmao 32</p>
            </footer>
        </div>
    );
};

export default PenghuniDashboard;
