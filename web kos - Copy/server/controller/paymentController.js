const midtransClient = require('midtrans-client');
const fetch = require('node-fetch');
const Payment = require('../model/payment');
const User = require('../model/user');
const crypto = require('crypto');

const createPayment = async (req, res) => {
    const { userId, duration } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log(`User not found for userId: ${userId}`);
            return res.status(404).json({ message: 'User not found' });
        }

        const orderId = `order-${userId}-${Date.now()}`;
        const amount = duration * 1000000; // Rp. 1,000,000 per month
        const authString = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64');

        const transactionParams = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount,
            },
            customer_details: {
                first_name: user.name,
                phone: user.no_telepon,
            },
            item_details: [
                {
                    id: `room-${user.no_kamar}`,
                    price: 1000000,
                    quantity: duration,
                    name: `Room Number ${user.no_kamar} Payment for ${duration} Month(s)`,
                },
            ],
            callbacks: {
                finish: `${process.env.FRONT_END_URL}/order-status/${orderId}`,
            },
        };

        console.log('Creating transaction with params:', transactionParams);

        const response = await fetch(`${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify(transactionParams),
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error(`Failed to create transaction with Midtrans: ${response.status} - ${response.statusText}`, responseText);
            return res.status(500).json({ message: 'Failed to create transaction with Midtrans' });
        }

        const data = await response.json();

        console.log('Midtrans transaction created successfully:', data);

        const payment = new Payment({
            userId: user._id,
            orderId: transactionParams.transaction_details.order_id,
            amount: amount,
            paymentStatus: 'pending',
            paymentDuration: duration,
            snap_token: data.token,
            snap_redirect_url: data.redirect_url,
        });

        await payment.save();

        user.payments.push(payment._id);
        user.tanggal_terakhir_bayar = new Date();
        user.durasi_bayar = duration;
        await user.save();

        res.status(201).json({ snap_token: data.token, snap_redirect_url: data.redirect_url });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getPaymentbyId = async (req, res) => {
    const { orderId } = req.params;
    try {
        const payment = await Payment.findOne({ orderId });
        if (!payment) {
            console.log(`Payment not found for orderId: ${orderId}`);
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const updatePaymentStatus = async (req, res) => {
    const { orderId, paymentStatus } = req.body;
    try {
        const payment = await Payment.findById(orderId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        payment.paymentStatus = paymentStatus;
        await payment.save();
        res.status(200).json({ message: 'Payment status updated successfully' });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateStatusBasedOnMidtransResponse = async (orderId, data) => {
    const hash = crypto.createHash('sha512').update(`${orderId}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`).digest('hex');
    if (data.signature_key !== hash) {
        return {
            status: 'error',
            message: 'Invalid Signature key',
        };
    }

    let responseData = null;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;

    if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
            const payment = await Payment.findOneAndUpdate({ orderId }, { paymentStatus: 'PAID', payment_method: data.payment_type }, { new: true });
            responseData = payment;
        }
    } else if (transactionStatus == 'settlement') {
        const payment = await Payment.findOneAndUpdate({ orderId }, { paymentStatus: 'PAID', payment_method: data.payment_type }, { new: true });
        responseData = payment;
    } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
        const payment = await Payment.findOneAndUpdate({ orderId }, { paymentStatus: 'CANCELLED', payment_method: data.payment_type }, { new: true });
        responseData = payment;
    } else if (transactionStatus == 'pending') {
        const payment = await Payment.findOneAndUpdate({ orderId }, { paymentStatus: 'PENDING', payment_method: data.payment_type }, { new: true });
        responseData = payment;
    }

    return { status: 'success', data: responseData };
};

const trxNotif = async (req, res) => {
    const data = req.body;
    try {
        const payment = await Payment.findOne({ orderId: data.order_id });
        if (payment) {
            const result = await updateStatusBasedOnMidtransResponse(payment.orderId, data);
            if (result.status == 'success') {
                res.status(200).json({ message: 'Payment status updated successfully' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error('Error handling Midtrans notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPayment,
    getPaymentbyId,
    updatePaymentStatus,
    trxNotif,
};