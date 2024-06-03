const UserModel = require('../model/user');

const getAllUsers = async () => {
    return await UserModel.find();
};

const createUser = async (user) => {
    return await UserModel.create(user);
};

const getUserById = async (id) => {
    return await UserModel.findById(id);
};

const getUserByUsername = async (username) => {
    return await UserModel.findOne({ username });
};

const getUserByNoKamar = async (no_kamar) => {
    return await UserModel.findOne({ no_kamar });
};

const updateUser = async (id, user) => {
    return await UserModel.findByIdAndUpdate(id, user);
};

const deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};

const createKeluhan = async (id, keluhan) => {
    const user = await UserModel.findByIdAndUpdate(id, keluhan);
}


module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser, getUserByUsername, getUserByNoKamar, createKeluhan};