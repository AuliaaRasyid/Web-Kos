const midtransClient = require('midtrans-client');
const fetch = require('node-fetch');
const Payment = require('../model/payment');
const User = require('../model/user');

const createPayment = async (req, res) => {
    const { userId, duration } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate amount
        const amount = duration * 1000000; // Rp. 1,000,000 per month
        const authString = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64');

        // Create transaction parameters
        const transactionParams = {
            transaction_details: {
                order_id: `order-${userId}-${Date.now()}`,
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
                    name: `Room Number${user.no_kamar} Payment for ${duration} Month(s)`
                }
            ],
            
        };

        const response = await fetch(`${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify(transactionParams)
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error(`Failed to create transaction with Midtrans: ${response.status} - ${response.statusText}`, responseText);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to create transaction with Midtrans'
            });
        }

        const data = await response.json();

        // Save payment to database
        const payment = new Payment({
            userId: user._id,
            orderId: transactionParams.transaction_details.order_id,
            amount: amount,
            paymentStatus: 'pending',
            paymentDuration: duration,
            snap_token: data.token
        });

        await payment.save();

        // Update user payment details
        user.payments.push(payment._id);
        user.tanggal_terakhir_bayar = new Date();
        user.durasi_bayar = duration;
        await user.save();

        res.status(201).json({ snap_token: data.token });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPayment,
};
