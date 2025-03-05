const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  teacher: {
    type: mongoose.ObjectId,
    ref: 'Teacher'
  }
});

module.exports = mongoose.model('Course', courseSchema);