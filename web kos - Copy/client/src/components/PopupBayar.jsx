import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constant';

const PopupBayar = ({ userId, closePopup }) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('1 Bulan');
    const [price, setPrice] = useState(1000000);

    const updatePrice = (duration) => {
        setPrice(duration * 1000000); // Rp. 1,000,000 per month
    };

    const handleChange = (event) => {
        const duration = parseInt(event.target.value.split(' ')[0]);
        setSelectedOption(event.target.value);
        updatePrice(duration); // Update the price whenever the selected duration changes
    };

    const handlePayment = async () => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}/create-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    duration: parseInt(selectedOption.split(' ')[0]),
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || 'Failed to create payment');
            }

            const data = await response.json();
            if (!data.snap_token) {
                throw new Error('snap_token is missing');
            }

            if (window.snap) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function (result) {
                        const redirectUrl = `/order-status/${result.order_id}`;
                        navigate(redirectUrl)
                        //Swal.fire('Success', 'Payment is successful', 'success');
                    },
                    onPending: function (result) {
                        console.log('pending', result);
                        Swal.fire('Pending', 'Payment is pending', 'info');
                    },
                    onError: function (result) {
                        console.log('error', result);
                        Swal.fire('Error', 'Payment failed', 'error');
                    },
                    onClose: function () {
                        Swal.fire('Cancelled', 'Payment process was cancelled', 'warning');
                    },
                });
            } else {
                throw new Error('Midtrans Snap is not loaded');
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    useEffect(() => {
        const duration = parseInt(selectedOption.split(' ')[0]);
        updatePrice(duration);
    }, [selectedOption]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-md bg-white p-4 shadow-md rounded-md">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="text-[20px] md:text-[24px] font-bold">Pembayaran</p>
                        <button className="text-[20px] md:text-[24px]" onClick={closePopup}>X</button>
                    </div>
                    <div>
                        <label htmlFor="bulan" className="block text-[18px] md:text-[20px]">Pilih Durasi Pembayaran:</label>
                        <select
                            id="bulan"
                            value={selectedOption}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md text-[16px] md:text-[18px]"
                        >
                            <option value="1 Bulan">1 Bulan</option>
                            <option value="2 Bulan">2 Bulan</option>
                            <option value="3 Bulan">3 Bulan</option>
                            <option value="4 Bulan">4 Bulan</option>
                            <option value="5 Bulan">5 Bulan</option>
                            <option value="6 Bulan">6 Bulan</option>
                        </select>
                    </div>
                    <div className="text-[18px] md:text-[20px]">
                        <p>Total Harga: Rp. {price.toLocaleString('id-ID')}</p>
                    </div>
                    <button className="w-full py-2 bg-[#9EB384] text-white text-[18px] md:text-[20px] 
                    rounded-md hover:bg-[#435334] transition-colors" onClick={handlePayment}
                    >
                        Bayar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupBayar;
