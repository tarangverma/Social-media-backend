const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    require: true,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 3,
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
}, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);