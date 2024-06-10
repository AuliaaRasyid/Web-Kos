const mongoose = require('mongoose');

const keluhanSchema = new mongoose.Schema({
  keluhan: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  no_kamar: {
    type: Number,
    required: true,
    unique: true,
  },
  no_telepon: {
    type: String,
    required: true,
  },
  keluhan: [keluhanSchema], // Array of complaints

  tanggal_masuk: {
    type: Date,
    required: true,
  },
  tanggal_terakhir_bayar: {
    type: Date,
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  durasi_bayar: {
    type: Number,
  },
  role: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);