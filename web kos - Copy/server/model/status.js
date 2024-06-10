const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  availability: {
    type: String,
    enum: ['Available', 'Full'],
    required: true,
    default: 'Available',
  },
});

module.exports= mongoose.model('Status', statusSchema);