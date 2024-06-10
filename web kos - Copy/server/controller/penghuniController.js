const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../model/user');
const Status = require('../model/status');

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch a user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create and register a new user
const createUserAndRegister = async (req, res) => {
    const { no_kamar, username, name, no_telepon, tanggal_masuk, tanggal_terakhir_bayar, password, role } = req.body;
    try {
        const [existingUser, existingNoKamar] = await Promise.all([
            userService.getUserByUsername(username),
            userService.getUserByNoKamar(no_kamar)
        ]);

        // Handle conflicts
        if (existingUser && existingNoKamar) {
            return res.status(409).json({ message: 'Username already exists and Room is already occupied' });
        } else if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        } else if (existingNoKamar) {
            return res.status(409).json({ message: 'Room is already occupied' });
        }

        const formattedTanggalMasuk = new Date(tanggal_masuk.split('/').reverse().join('-'));
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            no_kamar,
            username,
            name,
            no_telepon,
            tanggal_masuk: formattedTanggalMasuk,
            tanggal_terakhir_bayar: formattedTanggalMasuk,
            password: hashedPassword,
            role: role || 'user',
        };

        await userService.createUser(newUser);

        res.status(201).json({ message: 'User created and registered successfully' });
    } catch (error) {
        console.error('Error creating and registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { no_kamar, ...otherData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const existingNoKamar = await userService.getUserByNoKamar(no_kamar);
        if (existingNoKamar && existingNoKamar._id.toString() !== id) {
            return res.status(409).json({ message: 'Room is already occupied' });
        }

        const updatedUser = await userService.updateUser(id, { no_kamar, ...otherData });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user's password
const updateUserPassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a complaint for a user
const createKeluhan = async (req, res) => {
    const { id } = req.params;
    const { keluhan } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await userService.createKeluhan(id, { keluhan });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'Keluhan created successfully' });
    } catch (error) {
        console.error('Error creating keluhan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch all complaints
const getAllComplaints = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('no_kamar name keluhan');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch a complaint by ID
const getComplaintById = async (req, res) => {
    const { userId, complaintId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(complaintId)) {
        return res.status(400).json({ message: 'Invalid complaint ID' });
    }

    try {
        const user = await User.findById(userId).select('no_kamar name keluhan');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const complaint = user.keluhan.id(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({
            no_kamar: user.no_kamar,
            name: user.name,
            keluhan: complaint.keluhan
        });
    } catch (error) {
        console.error('Error fetching complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    const { userId, complaintId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const complaintIndex = user.keluhan.findIndex(complaint => complaint._id.toString() === complaintId);
        if (complaintIndex === -1) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        user.keluhan.splice(complaintIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get status kamar
const getStatus = async (req, res) => {
    try {
        const status = await Status.findOne();
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update status kamar
const updateStatus = async (req, res) => {
    try {
        const { availability } = req.body;
        let status = await Status.findOne();
        if (!status) {
            status = new Status({ availability });
        } else {
            status.availability = availability;
        }
        await status.save();
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUserAndRegister,
    updateUser,
    deleteUser,
    updateUserPassword,
    createKeluhan,
    getAllComplaints,
    getComplaintById,
    deleteComplaint,
    getStatus,
    updateStatus
};
