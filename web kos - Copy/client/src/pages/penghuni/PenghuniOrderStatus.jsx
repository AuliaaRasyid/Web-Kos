//import { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import Swal from 'sweetalert2';

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };
import Footer from "../../components/Footer";

const PenghuniOrderStatus = () => {
  return (
    <div className="admin-container font-forum">

      <main className="mainContent">
        <h1 className="text-[32px] md:text-[44px] p-6 md:p-10 pb-4">Order Status</h1>
        <div className="receipt-container text-[18px] md:text-[24px]">
          <div className="receipt">
            <h2 className='font-bold text-[24px] md:text-[28px]'>Receipt</h2>
            <div className="receipt-item">
              <span className="receipt-label">Order ID:</span>
              <span className="receipt-value">1487418921918514981</span>
            </div>
            <div className="receipt-item">
              <span className="receipt-label">Duration:</span>
              <span className="receipt-value">4 bulan</span>
            </div>
            <div className="receipt-item">
              <span className="receipt-label">Status:</span>
              <span className="receipt-value">Pending</span>
            </div>
            <div className="receipt-item">
              <span className="receipt-label">Date:</span>
              <span className="receipt-value">3-2-2023</span>
            </div>
          </div>
          <button className="backButton bg-[#9EB384] hover:bg-[#435334] text-white font-bold rounded">Back</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PenghuniOrderStatus;
