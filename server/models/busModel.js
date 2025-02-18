const mongoose = require('mongoose'); // Correct import statement

const userSchema = new mongoose.Schema({
  name: String,
  detime: String,
  email: String,
  phone: String,
  profile: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId, // Correctly referencing mongoose.Schema.Types
    ref: 'bus',
    default: null,
  },
});

const User = mongoose.model('bus', userSchema);

module.exports = User;
