import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from "../../components/Footer";
import { dateUtils } from '../../utils/dateUtils';
import { API_URL } from '../../utils/constant';

const PenghuniOrderStatus = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`${API_URL}/payment/${orderId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                Swal.fire(error.message);
            }
        };

        fetchOrderData();
    }, [orderId]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container font-forum">
            <main className="mainContent">
                <h1 className="text-[32px] md:text-[44px] p-6 md:p-10 pb-4">Order Status</h1>
                <div className="receipt-container text-[18px] md:text-[22px]">
                    <div className="receipt">
                        <h2 className="font-bold text-[24px] md:text-[28px]">Receipt</h2>
                        <div className="receipt-item">
                            <span className="receipt-label">Order ID:</span>
                            <span className="receipt-value">{orderData.orderId}</span>
                        </div>
                        <div className="receipt-item">
                            <span className="receipt-label">Duration:</span>
                            <span className="receipt-value">{orderData.paymentDuration} bulan</span>
                        </div>
                        <div className="receipt-item">
                            <span className="receipt-label">Status:</span>
                            <span className="receipt-value">{orderData.paymentStatus}</span>
                        </div>
                        <div className="receipt-item">
                            <span className="receipt-label">Date:</span>
                            <span className="receipt-value">{dateUtils(orderData.createdAt)}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className="backButton bg-[#9EB384] hover:bg-[#435334] text-white font-bold rounded">
                        Back
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PenghuniOrderStatus;
