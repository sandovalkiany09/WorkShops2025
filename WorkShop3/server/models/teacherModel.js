const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacher = new Schema({
  name: { type: String },
  subject: { type: String }
});

module.exports = mongoose.model('teachers', teacher);

